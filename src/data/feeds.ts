import type { StoreSection } from '../sections/config'

export type Feed = { title: string; url: string }

export const sectionFeeds: Record<StoreSection, Feed[]> = {
  knifes: [
    { title: 'KnifeNews', url: 'https://knifenews.com/feed/' },
    { title: 'Blade Magazine', url: 'https://blademag.com/feed' },
    { title: 'Reddit r/knives', url: 'https://www.reddit.com/r/knives/.rss' },
  ],
  kitchen: [
    { title: 'Serious Eats', url: 'https://www.seriouseats.com/feed' },
    { title: 'Bon Appétit', url: 'https://www.bonappetit.com/feed' },
    { title: 'Eater', url: 'https://www.eater.com/rss/index.xml' },
  ],
}
