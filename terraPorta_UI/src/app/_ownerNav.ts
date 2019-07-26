
function oNav(){
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const navigation = [
      {
        name: 'Dashboard',
        url: '/dashboard',
        icon: 'icon-speedometer',
      }
    ]
    if (currentUser){
      let org = {
        name: 'Organization',
        url: '/organizations/' + currentUser.org_id,
        icon: 'icon-star'
      }
      navigation.splice(1, 0, org);
    }
    if (currentUser.org_billing_active){
      let event = {
        name: 'Events',
        url: '/events',
        icon: 'fa fa-calendar',
      }
      navigation.splice(2, 0, event);
    } else {
      let event = {
        name: 'Events',
        url: '/billing',
        icon: 'fa fa-calendar',
      }
      navigation.splice(2, 0, event);
    }
    return navigation
}
export const ownerNavigation = oNav;
