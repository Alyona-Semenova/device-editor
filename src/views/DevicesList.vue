<template>
    <div class="device-list">
        <h2>Редактор устройств и узлов учёта.</h2>

        <ul v-for="device in devices" :key="device.id" class="device-item">
            <li class="device-item-name">
                <ListItem 
                    type="device" 
                    :item="device" 
                    :editingElement="editingElement"
                    @updateItem="updateItem"
                    @startEditing="startEditing"
                    @stopEditing="stopEditing"
                    @deleteItem="deleteItem"
                />
                <ul v-for="node in device.nodes" :key="node.id" class="node-item">
                    <li>
                        <ListItem 
                            type="node" 
                            :item="node" 
                            :editingElement="editingElement"
                            @updateItem="updateItem"
                            :parentId="device.id"
                            @startEditing="startEditing"
                            @stopEditing="stopEditing"
                            @deleteItem="deleteItem"
                        />
                    </li>
                </ul>
                <span class="add-item" @click="addNode(device.id)"><i>+ добавить узел</i></span>
            </li>
        </ul>

        <span class="add-item" @click="addDevice"><i>+ добавить устройство</i></span>
    </div>
</template>

<script>
import ListItem from '@/components/ListItem.vue';

export default {
    name: 'DevicesList',

    components: {
        ListItem,
    },

    data() {
        return {
            editingElement: null,
        };
    },


    computed: {
        devices() {
            return this.$store.getters.DEVICES_LIST;
        },
    },

    methods: {
        /**
         * add new device to devices list
         */
        addDevice() {
            const devices = Object.values(this.devices) ? Object.values(this.devices) : {};
            const lastDeviceId = devices.length ? devices[devices.length - 1].id : 0;
            let newDevice = {
                id: lastDeviceId ? lastDeviceId + 1 : 1,
                name: 'Новое устройство',
                nodes: {},
            };

            this.$store.commit('ADD_DEVICE', newDevice);
        },

        /**
         * add new node to device
         * @param deviceId 
         */
        addNode(deviceId) {
            const nodes = Object.values(this.devices[deviceId].nodes) ? Object.values(this.devices[deviceId].nodes) : {};
            const lastNodeId = nodes.length ? nodes[nodes.length - 1].id : 0;
            let newNode = {
                id: lastNodeId ? lastNodeId + 1 : 1,
                name: 'Новый узел',
                deviceId: deviceId,
            };

            this.$store.commit('ADD_NODE', { deviceId, newNode });
        },

        /**
         * update item name
         * @param type 
         * @param deviceId 
         * @param nodeId 
         * @param name 
         */
        updateItem(type, id, newName, parentId) {
            if (type === 'device') {
                let updatedDevice = {...this.devices[id], name: newName }
                this.$store.commit('UPDATE_DEVICE', updatedDevice);
            } else if (type === 'node' && parentId) {
                let updatedNode = {...this.devices[parentId].nodes[id], name: newName }
                this.$store.commit('UPDATE_NODE', updatedNode);
            }

            this.stopEditing();
        },

        /**
         * delete device or node
         * @param type 
         * @param deviceId 
         * @param nodeId 
         */
        deleteItem(type, id, parentId) {
            if (type === 'device') {
                this.$store.commit('REMOVE_DEVICE', id);
            } else if (type === 'node') {
                this.$store.commit('REMOVE_NODE', { parentId, id });
            }
        },

        /**
         * start edit element
         * @param type 
         * @param deviceId 
         * @param nodeId 
         */
        startEditing(type, id, parentId) {
            this.editingElement = { type, id, parentId};
        },

        /**
         * stop edit element
         */
        stopEditing() {
            this.editingElement = null;
        },
    },
}
</script>

<style lang="scss" scoped>
.device-list {
    .add-item {
        cursor: pointer;
        color: gray;
        font-size: 10px;
    }
}
</style>
