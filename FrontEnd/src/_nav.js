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
      name: "Weather Forecast",
      url: "/weather",
      icon: "fa fa-cloud"
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
          url: "/consumption",
          icon: "cui-lightbulb"
        },
        {
          name: "My Energy",
          url: "/my-energy",
          icon: "fa fa-bolt"
        },
        {
          name: "Real-Time Energy",
          url: "/real-time",
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
      url: "/recommendation",
      icon: "fa fa-thumbs-up"
    },
    {
      name: "Download Report",
      url: "",
      icon: "icon-cloud-download",
      class: "mt-auto",
      variant: "success",
      attributes: { target: "_blank", rel: "noopener" }
    }
  ]
};
