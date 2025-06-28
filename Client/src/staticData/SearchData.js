import PremiumComponent from '../components/util/PremiumComponent';

const mainFilters = [
  { name: 'People', component: null },
  { name: 'Jobs', component: null },
  { name: 'Posts', component: null },
  { name: 'Groups', component: null },
  { name: 'Companies', component: null },
  { name: 'Schools', component: null },
  { name: 'Courses', component: null },
  { name: 'Events', component: null },
  { name: 'Products', component: null },
  { name: 'Services', component: null },
];

const userFilters = [
  { name: '1st', component: null },
  { name: '2nd', component: null },
  { name: '3rd', component: null },
  { name: 'Actively hiring', component: <PremiumComponent size='size-4' /> },
];

const jobFilters = [
  { name: 'Remote', component: null },
  { name: 'Easy apply', component: null },
  { name: 'Top Applicant', component: <PremiumComponent size='size-4' /> },
  { name: '<10 Applicants', component: null },
];

export { mainFilters, userFilters, jobFilters };
