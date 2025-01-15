export interface RSSItem {
    imageUrl: string ;
    guid: string;
    link: string ;
    title:  string ;
    description:  string ;
    pubDate: Date ;
  }
  
  export interface RSSChannel {
    title: string;
    link: string;
    items: RSSItem[];
  }
  
  export interface RSS {
        channel: RSSChannel;
  }