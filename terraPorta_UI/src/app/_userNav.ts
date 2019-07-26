
function uNav(){
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const navigation = [
      {
        name: 'Dashboard',
        url: '/dashboard',
        icon: 'icon-speedometer',
      }
    ]
    if (currentUser.org_active){
      let event = {
        name: 'Events',
        url: '/events',
        icon: 'fa fa-calendar',
      }
      navigation.splice(1, 0, event);
    } else {
      let event = {
        name: 'Events',
        url: '/events/billing/info',
        icon: 'fa fa-calendar',
      }
      navigation.splice(1, 0, event);
    }
    return navigation
}
export const userNavigation = uNav;
