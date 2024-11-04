import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    devices: {
     1: {
        id: 1,
        name: "Устройство 1",
        nodes: {
          101: {
            id: 101,
            name: "Узел 1.1",
            deviceId: 1
          },
         102: {
            id: 102,
            name: "Узел 1.2",
            deviceId: 1
          }
        }
      },
     2: {
        id: 2,
        name: "Устройство 2",
        nodes: {
          201: {
            id: 201,
            name: "Узел 2.1",
            deviceId: 2
          }
        }
      },
      3: {
        id: 3,
        name: "Устройство 3",
        nodes: {
          301: {
            id: 301,
            name: "Узел 3.1",
            deviceId: 3
          },
         302: {
            id: 302,
            name: "Узел 3.2",
            deviceId: 3
          },
         303: {
            id: 303,
            name: "Узел 3.3",
            deviceId: 3
          }
        }
      }
    }
  },
  getters: {
    DEVICES_LIST: state => state.devices,
  },
  mutations: {
    /**
     * Add device
     * @param {*} state 
     * @param {*} device - {id, name, nodes}
     */
    ADD_DEVICE(state, device) {
      Vue.set(state.devices, device.id, device)
    },

    /**
     * Add node to device
     * @param {*} state 
     * @param {*} node - {deviceId, newNode}
     */
    ADD_NODE(state, node) { 
      Vue.set(state.devices[node.deviceId].nodes, node.newNode.id, node.newNode)
    },

    /**
     * Remove device
     * @param {*} state 
     * @param {*} deviceId
     */
    REMOVE_DEVICE(state, deviceId) {
      Vue.delete(state.devices, deviceId);
      console.log(`Устройство с ID ${deviceId} удалено.`);
    },

    /**
     * Remove node from device
     * @param {*} state 
     * @param {*} node - {deviceId, nodeId}
     */
    REMOVE_NODE(state, node) {
      Vue.delete(state.devices[node.deviceId].nodes, node.nodeId); 
      console.log(`Узел с ID ${node.nodeId} удален.`)
    },

    /**
     * Update device
     * @param {*} state 
     * @param {*} device - {id, name, nodes}
     */
    UPDATE_DEVICE(state, device) {
      state.devices[device.id] = device;
      console.log(`Устройство с ID ${device.id} обновлено.`)
    },

    /**
     * Update node
     * @param {*} state 
     * @param {*} node - {deviceId, nodeId, newNode}
     */
    UPDATE_NODE(state, node) {
      state.devices[node.deviceId].nodes[node.nodeId] = node;
      console.log(`Узел с ID ${node.nodeId} обновлен.`)
    },

  },
  actions: {
  },
  modules: {
  }
})
