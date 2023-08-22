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

    addListItem: function (item, type) {
      //income, expense htmls are prepared
      var html, list;
      if (type === "inc") {
        list = ".income__list";
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">$Description$</div><div class="right clearfix"><div class="item__value">$Value$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div>';
      } else {
        list = ".expenses__list";
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">$Description$</div><div class="right clearfix"><div class="item__value">$Value$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      //income, expenses are replaced by REPLACE cmd in the hmtl
      html = html.replace("%id%", item.id);
      html = html.replace("$Description$", item.description);
      html = html.replace("$Value$", item.value);
      //prepared html --> DOM
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
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
    items: {
      inc: [],
      exp: [],
    },
    totals: {
      inc: 0,
      exp: 0,
    },
  };
  return {
    addItem: function (type, desc, val) {
      var item, id;

      if (data.items[type].length === 0) id = 1;
      else {
        data.items[type][data.items[type].length - 1].id + 1;
      }

      if (type === "inc") {
        item = new Income(id, desc, val);
      } else {
        item = new Expense(id, desc, val);
      }
      data.items[type].push(item);

      return item;
    },
    seeData: function () {
      return data;
    },
  };
})();

var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    var input = uiController.getInput();

    //get data from uictrl
    //data from uictrl --> financecontroller, save them there
    var item = financeController.addItem(
      input.type,
      input.description,
      input.value
    );
    //data is presented in suitable section of web
    uiController.addListItem(item, input.type);
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
