<template>
    <div class="device-list">
        <h2>Редактор устройств и узлов учёта.</h2>

        <ul v-for="device in devices" :key="device.id" class="device-item">
            <li class="device-item-name">
                <template v-if="editingElement?.type === 'device' && editingElement.id === device.id">
                    <input 
                        :ref="'deviceInput-' + device.id" 
                        v-model="device.name" 
                        @blur="updateDevice(device.id)"
                        @keyup.enter="updateDevice(device.id)" 
                        @keyup.esc="stopEditing" 
                />
                </template>
                <template v-else>
                    <span>{{ device.name }}</span>
                    <span class="edit-icon" @click="startEditing('device', device.id)">✏️</span>
                    <span class="delete-icon" @click="deleteItem('device', device.id)">🗑️</span>
                </template>
                <ul v-for="node in device.nodes" :key="node.id" class="node-item">
                    <li>
                        <template
                            v-if="editingElement?.type === 'node' && editingElement.deviceId === device.id && editingElement.id === node.id">
                            <input 
                                :ref="'nodeInput-' + node.id" 
                                v-model="node.name"
                                @blur="updateNode(device.id, node.id)" 
                                @keyup.enter="updateNode(device.id, node.id)" 
                                @keyup.esc="stopEditing"/>
                        </template>
                        <template v-else>
                            <span>{{ node.name }} {{ node.id }}</span>
                            <span class="edit-icon" @click="startEditing('node', device.id, node.id)">✏️</span>
                            <span class="delete-icon" @click="deleteItem('node', device.id, node.id)">🗑️</span>
                        </template>
                    </li>
                </ul>
                <span class="add-item" @click="addNode(device.id)"><i>+ добавить узел</i></span>
            </li>
        </ul>

        <span class="add-item" @click="addDevice"><i>+ добавить устройство</i></span>
    </div>
</template>

<script>
export default {
    name: 'DevicesList',

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
            };

            this.$store.commit('ADD_NODE', { deviceId, newNode });
        },

        /**
         * update device name
         * @param id 
         */
        updateDevice(id) {
            this.$store.commit('UPDATE_DEVICE', { id, name: this.devices[id].name });
            this.stopEditing();
        },

        /**
         * update node name
         * @param deviceId 
         * @param nodeId 
         */
        updateNode(deviceId, nodeId) {
            this.$store.commit('UPDATE_NODE', { deviceId, nodeId, name: this.devices[deviceId].nodes[nodeId].name });
            this.stopEditing();
        },

        /**
         * delete device or node
         * @param type 
         * @param deviceId 
         * @param nodeId 
         */
        deleteItem(type, deviceId, nodeId = null) {
            if (type === 'device') {
                this.$store.commit('REMOVE_DEVICE', deviceId);
            } else if (type === 'node') {
                this.$store.commit('REMOVE_NODE', { deviceId, nodeId });
            }
        },

        /**
         * start edit element
         * @param type 
         * @param deviceId 
         * @param nodeId 
         */
        startEditing(type, deviceId, nodeId = null) {
            this.editingElement = { type, id: nodeId ? nodeId : deviceId, deviceId };

            // auto focus & select on input
            this.$nextTick(() => {
                if (type === 'device') {
                    this.$refs['deviceInput-' + deviceId][0].focus();
                    this.$refs['deviceInput-' + deviceId][0].select();
                } else if (type === 'node') {
                    this.$refs['nodeInput-' + nodeId][0].focus();
                    this.$refs['nodeInput-' + nodeId][0].select();

                }
            });
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

    .edit-icon {
        cursor: pointer;
        margin-left: 5px;
    }

    .delete-icon {
        cursor: pointer;
        margin-left: 5px;        
    }

}
</style>
