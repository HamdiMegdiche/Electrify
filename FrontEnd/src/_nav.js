export default {
  items: [
    {
      title: true,
      name: "Analytics"
    },
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer"
    },
    {
      title: true,
      name: "Powerchain"
    },
    {
      name: "Trades",
      url: "/trades",
      icon: "fa fa-exchange"
    },
    {
      name: "Offers",
      url: "/offers",
      icon: "cui-cart"
    },
    {
      name: "Settings",
      url: "/settings",
      icon: "cui-wrench"
    },
    {
      divider: true
    },
    {
      name: "Smart-Hub",
      url: "/smart-hub",
      icon: "fa fa-microchip",
      children: [
        {
          name: "Consumption",
          url: "/smart-hub",
          icon: "cui-lightbulb"
        },
        {
          name: "My Energy",
          url: "/smart-hub",
          icon: "fa fa-bolt"
        },
        {
          name: "Real-Time Energy",
          url: "/smart-hub",
          icon: "cui-chart"
        }
      ]
    },
    {
      divider: true
    },
    {
      title: true,
      name: "Recommondations"
    },
    {
      name: "House Hold",
      url: "/house-hold",
      icon: "fa fa-home"
    },
    {
      name: "Suggested Offers",
      url: "/suggested-offers",
      icon: "fa fa-thumbs-up"
    },
    {
      name: "Download Report",
      url: "",
      icon: "icon-cloud-download",
      class: "mt-auto",
      variant: "success",
      attributes: { target: "_blank", rel: "noopener" }
    },
    {
      name: "Upgrade To Prosumer",
      url: "",
      icon: "icon-layers",
      variant: "danger",
      attributes: { target: "_blank", rel: "noopener" }
    }
  ]
};
