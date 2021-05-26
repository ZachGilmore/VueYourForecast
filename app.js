// Zach Gilmore
// 5-18-21
// CIS-131
// Project: Final Project


//alert("i'm working");

//Gotta have a little bit of vanilla;
//Create global variables
var c = document.getElementById("c");
var f = document.getElementById("f");

new Vue ({
    el: "#root",
    data: 
    {
        kelvin: "", //Actual kelvin temp used for testing and unit conversions
        fahr: "",
        celsius: "",

        city: "",
        zip: "",
        error: "",

        overcast: "",   //Used to display conditions and img icon

        icon: "http://openweathermap.org/img/wn/",   //Path for icon img
        suffix: "@2x.png",                           //Ending of icon url

        validation: ""

    },

    //User input wouldn't work with a mounted function

    // mounted()    
    // {   
    //     //API Call
    //     axios.get("https://api.openweathermap.org/data/2.5/weather?zip=" + userZip.value + ",us&appid=293b183829deadc921ecf3d89763d0e2")
    //     .then( (response) => {
    //         //alert("I'm working");
    //         this.kelvin = response.data.main.temp;
    //         this.overcast = response.data.weather[0];
    //         console.log(this.overcast);
    //         this.city = response.data.name;

    //     }) 
    // },

    methods:
    {  
        //I added this function after the temp conversions
        submit()
        {
            //Create a local variable for user input
            let userZip = document.getElementById("zip");
            
            //Generate an api call with user input
            axios.get("https://api.openweathermap.org/data/2.5/weather?zip=" + userZip.value + ",us&appid=293b183829deadc921ecf3d89763d0e2")
            .then( (response) => {
                //alert("I'm working");
                console.log(response);
                //Define the vue data
                this.kelvin = response.data.main.temp;
                this.overcast = response.data.weather[0];
                //console.log(this.overcast);
                this.city = response.data.name;
                this.validation = response.status;
            })
            
            //Valid zip codes/Data validation 
            //I just googled lowest and highest US zip codes
            if (userZip.value >= 00501 && userZip.value <= 99950)
            {
                this.zip = "Request sent successfully. Select your unit of measurement.";
            }                
            else if (this.validation == 404)    //The dreaded 404
            {
                this.zip = "Unexpected error occurred. Please try again.";
            }            
            //If no input is given
            else if (userZip.value == "")
            {
                this.zip = "Must enter a zip code";
            } 
        }, 

        /* Converts Kelvin to Fahrenheit */
        fahrConvert()
        {
            this.fahr =  Math.floor((this.kelvin - 273.15) * 9/5 + 32);
            //console.log(this.fahr) 

            //Toggles celsius off when clicked by subtracting celsius from itself
            if (this.celsius > 0)
            {
                this.celsius -= this.celsius;
            }

        },
        
        /* Converts Kelvin to Celsius */
        convertCelsius()
        {
            this.celsius = Math.floor(this.kelvin - 273.15);
            //console.log(this.celsius);

            //Toggles Fahrenheit off when clicked by subtracting fahr from itself
            if (this.fahr > 0)
            {
                this.fahr -= this.fahr;
            }

        }
    }
    
})