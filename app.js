var uiController = (function () {
  var DOMsrtings = {
    inputTypeClassList: ".add__type",
    inputDescriptionClasslist: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
  };
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMsrtings.inputTypeClassList).value,
        description: document.querySelector(
          DOMsrtings.inputDescriptionClasslist
        ).value,
        value: document.querySelector(DOMsrtings.inputValue).value,
      };
    },
    getDOMstrings: function () {
      return DOMsrtings;
    },
  };
})();

var financeController = (function () {
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var data = {
    allItems: {
      inc: [],
      exp: [],
    },
    totals: {
      inc: 0,
      exp: 0,
    },
  };
})();

var appController = (function (uiController, financeController) {
  var DOM = uiController.getDOMstrings();

  var ctrlAddItem = function () {
    console.log(uiController.getInput());
    //get data from uictrl
    //data from uictrl --> financecontroller, save them there
    //data is presented in suitable section of web
    //calculate the finance
    //and presented it on web (remaining, calculation)
  };
  var setupEventListeners = function () {
    var DOM = uiController.getDOMstrings();

    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });

    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  return {
    init: function () {
      console.log("app started");
      setupEventListeners();
    },
  };
})(uiController, financeController);

appController.init();
