$(document).ready(() => {
   
   // AJAX CALL TO DYNAMICALLY GENERATE BURGERS FROM API
   $.ajax('/api/burgers', {
      type: 'GET'
   }).then(data => {
      let uneatenElem = $('#uneaten');
      let devouredElem = $('#devoured');
      let burgers = data.burgers;
      let len = burgers.length;
      // console.log(burgers);

      for (let i = 0; i < len; i++) {
         let burgerBtn =
            `<li>${burgers[i].burger_name}<button type='button' class='btn btn-primary devour' data-id='${burgers[i].id}'data-devoured='${burgers[i].devoured}'>Devour</button></li>`;

         let deleteBtn =
            `<li>${burgers[i].burger_name}<button type='button' class='btn btn-danger deleteBtn' data-id='${burgers[i].id}' data-devoured='${burgers[i].devoured}'>Delete</button</li>`;

         if (burgers[i].devoured) {
            devouredElem.append(deleteBtn);
         } else {
            uneatenElem.append(burgerBtn);
         }
      }
   });

   // DEVOUR BUTTON
   $(document).on("click", ".devour", function(event) {
      event.preventDefault();
  
      var burger_id = $(this).data("id");
  
      let isDevoured = $(this).data('devoured') === true;
      console.log(burger_id)
      console.log(isDevoured);
      let newDevoured = {
         devoured: isDevoured
      };
      $.ajax(`/api/burgers/${burger_id}`, {
         type: 'PUT',
         data: JSON.stringify(newDevoured),
         dataType: 'json',
         contentType: 'application/json'
      }).then(() => {
         console.log('changed devoured status to', isDevoured);
         location.reload();
      });
   });

   // CREATE NEW BURGER
   $('#burger-submit').on('click', event => {
      event.preventDefault();
      let newBurger = {
         burger_name: $('#burgerInput').val().trim(),
         devoured: false
      };
      $.ajax('/api/burgers', {
         type: 'POST',
         data: JSON.stringify(newBurger),
         dataType: 'json',
         contentType: 'application/json'
      }).then(() => {
         console.log('created new burger');
         location.reload();
      });
      // console.log(newBurger);
   });
   
   // DELETE BUTTON
   $(document).on("click", ".deleteBtn", function(event) {
      event.preventDefault();
      let burger_id = $(this).data("id");
      // console.log(burger_id);

      // SEND DELETE REQUEST
      $.ajax(`/api/burgers/${burger_id}`, {
         type: 'DELETE'
      }).then(() => {
         console.log('deleted burger', burger_id);
         location.reload();
      });
   });
});