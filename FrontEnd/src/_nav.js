export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',

    },
    {
      title: true,
      name: 'Analytics',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Smart-Hub',
      url: '/smart-hub',
      icon: 'icon-gear',
      children: [
        {
          name: 'Consumption',
          url: '/smart-hub',
          icon: 'icon-bell',
        },
        {
          name: 'My Energy',
          url: '/smart-hub',
          icon: 'icon-bell',
        },
        {
          name: 'Real-Time Energy',
          url: '/smart-hub',
          icon: 'icon-bell',
        },
      ],
    },
    {
      divider: true,
    },
    {
      title: true,
      name: 'Recommondations',
    },
    {
      name: 'House Hold',
      url: '/house-hold',
      icon: 'icon-star',
    },
    {
      name: 'Suggested Offers',
      url: '/suggested-offers',
      icon: 'icon-ban',
    },
    {
      name: 'Download Report',
      url: 'https://coreui.io/react/',
      icon: 'icon-cloud-download',
      class: 'mt-auto',
      variant: 'success',
      attributes: { target: '_blank', rel: "noopener" },
    },
    {
      name: 'Upgrade To Prosumer',
      url: 'https://coreui.io/pro/react/',
      icon: 'icon-layers',
      variant: 'danger',
      attributes: { target: '_blank', rel: "noopener" },
    },
  ],
};
