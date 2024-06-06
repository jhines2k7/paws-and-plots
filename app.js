const router = new Navigo('/', { hash: true });

import { Story } from './components/story.js';

router
  .on(() => {
    router.navigate(`/the-healing-bond`);
  })
  .on('/:slug', (match) => {
    document.getElementById('main').innerHTML = '';

    const story = new Story();
    story.slug = match.data.slug;
    story.router = router;

    document.getElementById('main').appendChild(story);
  })
  .resolve();