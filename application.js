var myJSONData = JSON.stringify([{"orderId" : 1 , "packingStart" : 224 , "duration" : 69  },
                                 {"orderId" : 2 , "packingStart" : 335 , "duration" : 91  },
                                 {"orderId" : 3 , "packingStart" : 23  , "duration" : 47  },
                                 {"orderId" : 4 , "packingStart" : 130 , "duration" : 52  },
                                 {"orderId" : 5 , "packingStart" : 5   , "duration" : 183 },
                                 {"orderId" : 6 , "packingStart" : 253 , "duration" : 71  },
                                 {"orderId" : 7 , "packingStart" : 41  , "duration" : 68  }]);

function Order(orderId,packingStart,duration){
  this.orderId      = orderId;
  this.packingStart = packingStart;
  this.duration     = duration;
  this.left         = 0;
  this.width        = 800;
}


Order.prototype.shrinkToFit = function(){
  factor = 800 / this.width
}

function Schedule(orders){
  this.orders = orders || [];
}

Schedule.prototype = {
               add: function(order){
                      this.orders.push(order);
                    },
      shrinkOrders: function(exisitingOrder, newOrder){
                      var factor   = 800 / exisitingOrder.width;
                      var ratio    = (factor / factor + 1);
                      var newWidth = exisitingOrder.width * ratio;

                      exisitingOrder.width = newWidth;
                      newOrder.width       = newWidth;
                      newOrder.left        = newWidth;
                    },
        checkRange: function(exisitingOrder, newOrder){
                      var oldStart = exisitingOrder.packingStart;
                      var oldEnd   = exisitingOrder.packingStart + exisitingOrder.duration;
                      var newStart = newOrder.packingStart;
                      var newEnd = newOrder.packingStart + newOrder.duration;

                      if(oldStart <= newStart && newStart <= oldEnd ||
                         oldStart <= newEnd && newEnd <= oldEnd)
                        {
                          shrinkOrders(exisitingOrder, newOrder)
                        };
                    },
  checkTimeOverlap: function(order){
                      this.orders.each();
                    },
}

function renderOrder(element, index, array){
    console.log("this worked");
    var orderTemplate = '<div class="order" style="height =' + element.duration +'px;top=' +
                        element.packingStart + 'px;float:left;">' + element.orderId + '<div>';
    $('.schedule').append(orderTemplate);
}
var Renderer = {
           // init: function(orders){
           //         myOrders.each(convertOrder);
           //         this.mySchedule = new Schedule(orders);
           //       },
    renderOrder: function(element, index, array){
                   console.log("this worked");
                   var orderTemplate = '<div class="order" style="height =' + element.duration +'px;top=' +
                       element.packingStart + 'px;float:left;">' + element.orderId + '<div>';
                   $('.schedule').append(orderTemplate);
                 },
  displayOrders: function(){
                   console.log('displayOrders');
                   this.mySchedule.orders.forEach(renderOrder)
                 }
};

function ScheduleManager(){

};

ScheduleManager.prototype = {
  parseSchedule: function(jsonData){
    var myOrders = JSON.parse(orders);
  }
}

// $(function() {
//   console.log('workd');
//   Renderer.init(myJSONData);
//   Renderer.displayOrders();
// });
