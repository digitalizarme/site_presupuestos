import {
  PageHome,
} from './';

export default {
  path: '/',
  name: 'Home',
  childRoutes: [
    { path: 'page-home',
      name: 'Page home',
      component: PageHome,
      isIndex: true,
    },
  ],
};
