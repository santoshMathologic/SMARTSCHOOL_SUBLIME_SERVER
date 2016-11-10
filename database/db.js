var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/smartSchool', function(error) {
    if (error) {
        console.log('Error Connection in Database', error);
    } else {
        console.log('Connection to Database Successfully');
    }
});

