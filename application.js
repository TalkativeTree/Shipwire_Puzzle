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
  this.parentOrders = [];
}

Order.prototype = {
     convert: function(object){
                this.orderId       = object.orderId;
                this.packingStart  = object.packingStart;
                this.duration      = object.duration;
                this.template = '<div class="order'+ this.orderId +' style="height:' + this.duration +
                                'px; position:absolute; top:' + this.packingStart + 'px; left:'+ this.left +
                                '; width:'+ this.width +'px"> #' + this.orderId + '<div>';
              },
  addParents: function(orders){
                this.parentOrders.push(orders);
                console.log(orders);
                console.log(this.parentOrders);
              }
};

function Schedule(orders){
  this.orders = orders || [];
  this.node   = $('.schedule');
}

Schedule.prototype = {
            add: function(order){
                   this.orders.push(order);
                 },
  updateParents: function(order){
                   for(var p = 0; p < order.parentOrders.length; p++){
                     var parentOrder = order.parentOrders[p];
                   };
                 // for(var i =0; i < todaysSchedule.orders.length; i++){
                 //   newOrder = todaysSchedule.orders[i];
                 //   if(newOrder.orderId===5){
                 //     todaysSchedule.checkTimeOverlap(newOrder);
                 //   }
                 }
};


var ScheduleOrganizer = {
              init: function(orders){
                      console.log(this);
                      this.convertAll(orders);//this.schedule.orders is currently being pushed all of the orders. Should do only one at a time
                      for(var i = 0; i < this.schedule.orders.length; i++){
                        var queuedOrder = this.schedule.orders[i];
                        this.checkTimeOverlap(queuedOrder);
                        this.schedule.add(queuedOrder);
                        }
                    },
    convertToOrder: function(order){
                      var newOrder = new Order;
                      newOrder.convert(order);
                      return newOrder;
                    },
        convertAll: function(myJSONOrders){
                      myParsedOrders = JSON.parse(myJSONOrders);
                      var newOrders =  myParsedOrders.map(this.convertToOrder);
                      this.schedule = new Schedule(newOrders);
                    },
  checkTimeOverlap: function(order){
                      for(var currentOrderIndex = 0; currentOrderIndex < (this.schedule.orders.length); currentOrderIndex++){
                        allOrders = this.orders;
                        var existingOrder = this.schedule.orders[currentOrderIndex] || new Order;
                        this.checkRange(existingOrder, order);
                      }
                    },
        checkRange: function(existingOrder, newOrder){
                       // console.log(existingOrder);
                       // console.log(newOrder);
                       // debugger;
                       var oldStart = existingOrder.packingStart;
                       var oldEnd   = existingOrder.packingStart + existingOrder.duration;
                       var newStart = newOrder.packingStart;
                       var newEnd = newOrder.packingStart + newOrder.duration;

                      if(oldStart <= newStart && newStart <= oldEnd ||
                         oldStart <= newEnd && newEnd <= oldEnd)
                        {
                          this.resizeParents(existingOrder, newOrder);
                          // this.checkTimeOverlap(existingOrder);
                        }
                    },
       resizeOrder: function(existingOrder, newOrder){
                      var baseWidth = newOrder.parentOrders[0] || this.width;
                      var factor   = 800 / baseWidth;
                      var widthRatio    = factor / (factor + 1);
                      console.log(ratio);
                      var newWidth = existingOrder.width * ratio;
                      console.log(newWidth);

                      existingOrder.width = newWidth;
                      newOrder.width      = newWidth;
                      newOrder.left       = (newWidth + existingOrder.left);
                    },
     resizeParents: function(existingOrder, newOrder){
                      newOrder.addParents(existingOrder);
                      console.log('check parents');
                      console.log(newOrder);
                      if(existingOrder.parentOrders.length > 0){
                        console.log("this is:");
                        console.log(this);
                        this.checkRange(parentOrder);
                        this.schedule.updateParents(existingOrder);
                      }
                    }
};

$(function() {
  ScheduleOrganizer.init(myJSONData);
});
