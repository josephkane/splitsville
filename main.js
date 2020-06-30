Vue.component("data-input", {
  data() {
    return {
      agentName: null,
      agentCap: null,
      agentGross: null,
      agentCurrent: null,
      agentPreSplit: null,
      agentPostSplit: null,
      brokerOneName: null,
      brokerOnePreSplit: null,
      brokerOnePostSplit: null,
      brokerTwoName: null,
      brokerTwoPreSplit: null,
      brokerTwoPostSplit: null,
    }
  },
  methods: {
    onSubmit() {
      const data = {
        agentName: this.agentName,
        agentCap: this.agentCap,
        agentGross: this.agentGross,
        agentCurrent: this.agentCurrent,
        agentPreSplit: this.agentPreSplit,
        agentPostSplit: this.agentPostSplit,
        brokerOneName: this.brokerOneName,
        brokerOnePreSplit: this.brokerOnePreSplit,
        brokerOnePostSplit: this.brokerOnePostSplit,
        brokerTwoName: this.brokerTwoName,
        brokerTwoPreSplit: this.brokerTwoPreSplit,
        brokerTwoPostSplit: this.brokerTwoPostSplit,
      }
      this.$emit("calculate", data)
    },
    clear() {
      this.agentName = null
      this.agentCap = null
      this.agentGross = null
      this.agentCurrent = null
      this.agentPreSplit = null
      this.agentPostSplit = null
      this.brokerOneName = null
      this.brokerOnePreSplit = null
      this.brokerOnePostSplit = null
      this.brokerTwoName = null
      this.brokerTwoPreSplit = null
      this.brokerTwoPostSplit = null

      this.$emit("clear");
    }
  }
})

let app = new Vue({
  el: "#app",

  data: {
    agentName: "Agent",
    agentTakeHome: 0,
    brokerOneName: "Broker 1",
    brokerOneTakeHome: 0,
    brokerTwoName: "Broker 2",
    brokerTwoTakeHome: 0,
    collierTakeHome: 0,
    calculated: false,
  },
  methods: {
    calculate(data) {
      this.clear();
      this.agentName = data.agentName ? data.agentName : this.agentName;
      this.brokerOneName = data.brokerOneName ? data.brokerOneName : this.brokerOneName;
      this.brokerTwoName = data.brokerTwoName ? data.brokerTwoName : this.brokerTwoName;

      let agentCurrent = data.agentCurrent;

      for (let i = 0; i < data.agentGross; i++) {
        if (agentCurrent < data.agentCap) {
          this.agentTakeHome = this.agentTakeHome + data.agentPreSplit; // 0.70
          this.brokerOneTakeHome = this.brokerOneTakeHome + data.brokerOnePreSplit; // 0.05
          this.brokerTwoTakeHome = this.brokerTwoTakeHome + data.brokerTwoPreSplit; // 0.025
          to_collier = (1 - data.agentPreSplit - data.brokerOnePreSplit - data.brokerTwoPreSplit); // 0.225
          this.collierTakeHome = this.collierTakeHome + to_collier;
          agentCurrent = agentCurrent + (1 - data.agentPreSplit);
        } else {
          this.agentTakeHome = this.agentTakeHome + data.agentPostSplit; // 0.80
          this.brokerOneTakeHome = this.brokerOneTakeHome + data.brokerOnePostSplit; // 0.025
          this.brokerTwoTakeHome = this.brokerTwoTakeHome + data.brokerTwoPostSplit; // 0.02
          to_collier = (1 - data.agentPostSplit - data.brokerOnePostSplit - data.brokerTwoPostSplit); // 0.155
          this.collierTakeHome = this.collierTakeHome + to_collier
          data.agentCurrent = data.agentCurrent + (1 - data.agentPostSplit);
        };

      }

      this.calculated = true;
    },
    clear() {
      this.agentName = "Agent";
      this.brokerOneName = "Broker 1";
      this.brokerTwoName = "Broker 2";
      this.agentTakeHome = 0;
      this.brokerOneTakeHome = 0;
      this.brokerTwoTakeHome = 0;
      this.collierTakeHome = 0;
      this.calculated = false;
    }
  }
})
