$(document).ready(() => {

    console.log('hello! welcome to trading calculator');

    // search function

    function myFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";

        }
    }
}
    const stockObj = [
        {
            name: 'google',
            costPerShare: 10000,
            symbol: 'goo'
},
        {
            name: 'apple',
            costPerShare: 34343,
            symbol: 'app'
},
        {
            name: 'finance and markets',
            costPerShare: 213213213,
            symbol: 'fam'
}
                ];

//ajax call
    
//    $.ajax {
//        URL: ''
//    }
});
