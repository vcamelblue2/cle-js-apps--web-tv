import { ComponentsRegistry } from "cle.js/lib";


ComponentsRegistry.define({ ChannelSearchService: {

  id: "chsearch",

  let:{
    filter: "",
    filtering: $ => $.filter !== ""
  },

  def: {

    getFilteredChannels($, channelGroups, filter=undefined){
      filter = filter ?? $.filter
      let filtered = channelGroups.filter(group => $.groupMatchSearch(group))
      return filtered.map(group => ({...group, channels: group.channels.filter(ch=>$.channelMatchSearch(ch))}) )
    },

    groupMatchSearch($, group){
      if ($.filter.length === 0){
        return true
      }

      let filter = $.filter.toLowerCase()

      return group.channels.find(c=>c.num.toString().includes(filter) || c.label.toLowerCase().includes(filter))
    },

    channelMatchSearch($, channel){
      if ($.filter.length === 0){
        return true
      }

      let filter = $.filter.toLowerCase()

      return channel.num.toString().includes(filter) || channel.label.toLowerCase().includes(filter)
    }
  }

}}, 'Service')