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

      return group.channels.find(c=>c.num.toString().startsWith($.filter) || c.label.toLowerCase().startsWith($.filter))
    },

    channelMatchSearch($, channel){
      if ($.filter.length === 0){
        return true
      }

      return channel.num.toString().startsWith($.filter) || channel.label.toLowerCase().startsWith($.filter)
    }
  }

}}, 'Service')