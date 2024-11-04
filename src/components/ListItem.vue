<template>
<div class="list-item"> 
    <template v-if="editingElement?.type === type && editingElement.id === item.id && editingElement?.parentId === parentId">
        <input 
            :ref="inputRef" 
            :value="item.name"
            @blur="updateItem"
            @keyup.enter="updateItem" 
            @keyup.esc="stopEditing" 
        />
    </template>
    <template v-else>
        <span>{{ item.name }}</span>
        <span class="edit-icon" @click="startEditing(type, item.id)">✏️</span>
        <span class="delete-icon" @click="deleteItem(type, item.id)">🗑️</span>
    </template>
</div>
</template>

<script>
export default {
    name: 'ListItem',
    props: {
        type: {
            type: String,
        },
        item: {
            type: Object,
            required: true
        },
        editingElement: {
            type: Object,
            default: null
        },
        parentId: {
            type: Number,
            default: null
        },
    },

    computed: {
        inputRef() {
            if (this.parentId) {
                return this.type + 'Input-' + this.parentId + this.item.id
            } else {
                return this.type + 'Input-' + this.item.id
            }
        }
    },

    methods: {
        updateItem(val) {
            this.$emit('updateItem', this.type, this.item.id, val.target.value, this.parentId)
        },

        startEditing(type, id) {
            this.$emit('startEditing', type, id, this.parentId);
            this.$nextTick(() => {
                let ref = this.$refs[this.inputRef];
                ref.focus();
                ref.select();
            });
        },

        stopEditing() {
            this.$emit('stopEditing')
        },

        deleteItem() {
            this.$emit('deleteItem', this.type, this.item.id, this.parentId)
        },
    },
}

</script>


<style lang="scss" scoped>
.edit-icon, .delete-icon  {
    cursor: pointer;
    margin-left: 5px;
}

</style>

