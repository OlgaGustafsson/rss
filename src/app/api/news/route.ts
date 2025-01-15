import { ElementCompact, xml2js } from 'xml-js';
import { RSS, RSSChannel, RSSItem } from '../../../../interface';
import { NextResponse } from 'next/server';
import { extractImageUrlFromHTML } from '@/utils/imageUrl';

export const dynamic = 'force-dynamic'


export async function GET() {
    try {
        const response = await fetch('https://');
        const data = await response.text();
        const xml: ElementCompact = xml2js(data, { compact: true, ignoreDeclaration: true }) as ElementCompact;

        if (!xml || !xml.rss || !xml.rss.channel || !xml.rss.channel.item) {
          throw new Error('Invalid XML format');
      }
        
        
        const items: RSSItem[] = await Promise.all(xml.rss.channel.item.map(async (item: any) => {
            const imageUrl = await extractImageUrlFromHTML(item.link._text); 
            return {
                guid: item.guid._text || '',
                link: item.link._text || '',
                title: item.title._text || '',
                description: (item.description._text || '').substring(0, 65),
                pubDate: new Date(item.pubDate._text || ''),
                imageUrl: imageUrl, 
            };
        }));

        const channel: RSSChannel = {
            title: xml.rss.channel.title._text || '',
            link: xml.rss.channel.link._text || '',
            items: items,
        };

        const rssFeed: RSS = {
            //version: xml.rss._attributes.version || '',
            channel: channel,
        };

        return NextResponse.json(rssFeed, { status: 200 });
    } catch (error) {
        console.error('Error fetching RSS feed:', error);
    }
}