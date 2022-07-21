export function getPageTitle() {
  let navigationPath = window && window.location && window.location.pathname;

  let bottomBarItems = [
    { index: 0, heading: 'Dashboard Page', pagePath: '/' },
    { index: 1, heading: 'Audiences List Page', pagePath: '/Audiences' },
    { index: 2, heading: 'Audience Builder Page', pagePath: '/AudienceSizer' },
    { index: 3, heading: 'Campaign Goals Page', pagePath: '/Planning' },
    { index: 4, heading: 'Campaign Creation Page', pagePath: '/Campaign' },
    { index: 5, heading: 'Email Notification Page', pagePath: '/CampaignConfirmation' },
    { index: 6, heading: 'Insights Page', pagePath: '/Insights' },
    { index: 7, heading: 'Terminology Page', pagePath: '/Terminology' },
    { index: 9, heading: 'Create New User Admin Page', pagePath: '/AddUser' },
    { index: 10, heading: 'Admin Users List Page', pagePath: '/AdminUsersList' },
    { index: 11, heading: 'Audience Traits List Page', pagePath: '/AdminAudienceSegmentList' },
    { index: 11, heading: 'Create New Audience Traits Page', pagePath: '/AdminAudienceSegment' },
    { index: 12, heading: 'Admins Landing Page', pagePath: '/Admin' },
    { index: 13, heading: 'Reporting Landing Page', pagePath: '/Reporting' },
    { index: 14, heading: 'CRM Uploading Page', pagePath: '/CRMUploader' },
    { index: 15, heading: 'Dashboard Page', pagePath: '/redui' }

  ];
  const pageIndex = bottomBarItems.findIndex((obj: any) => obj.pagePath === navigationPath);

  if (pageIndex >= 0) {
    return bottomBarItems[pageIndex].heading;
  }
  return '';
}

export function getCopyrightsYear(date:any) {
  let currYear = new Date().getFullYear();

  let copyrightsYear = new Date(date);

  if (isNaN(copyrightsYear.getFullYear())) {
    if (date && date !== '') {
      const dateStr = date.replace(/-/g, '\/').split('/', 3);

      copyrightsYear = new Date(dateStr[2], Number(dateStr[1] - 1), dateStr[0]);
    }
  }
  if (currYear > copyrightsYear.getFullYear()) {
    return currYear;
  }
  return copyrightsYear.getFullYear();

}
