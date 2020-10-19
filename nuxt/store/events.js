export const state = () => ({
  events: []
})

export const mutations = {
  updateEvents(state, events) {
    state.events = events
  },
  addEvent(state, event) {
    state.events.push(event)
  }
}

export const actions = {
  async getEvents({commit}) {
    const events = await this.$axios.get('http://localhost:7000/events').then(res => res.data)
    // return events
    commit('updateEvents', events)
  },
  async setEvent(state, event) {
    try {
      await this.$axios.post('http://localhost:7000/events', event)
        .then(res => res)
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}

export const getters = {
  events: state => state.events
}
