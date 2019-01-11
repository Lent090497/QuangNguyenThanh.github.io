var check = false;
//Create Calendar
function createTable() {
    if (!check) {
        var container = document.getElementById("container");
        var table = document.createElement("table");
        table.setAttribute("id", "table");
        createNav(table);
        createRowDate(table);
        
        var i, j;
        var today = new Date();
        var currentMonth = today.getMonth();
        var currentYear = today.getFullYear();
        var dayOfMonth = daysInMonth(currentMonth, currentYear);
    
        var firstDay = new Date(currentYear, currentMonth, 1).getDay();
    
        var count = 1;
        for (i = 0; i < 6; i++) {
            var row = document.createElement("tr");
            for (j = 0; j < 7; j++) {
                var cell = document.createElement("th");
                cell.setAttribute("id", "cell" + (i * 7 + j));
                if (i === 0 && j < firstDay) {
                    cell.setAttribute("class", "not_day-js");                
                    row.appendChild(cell);
                    continue;
                }
                if (count <= dayOfMonth) {
                    cell.setAttribute("class", "day-js");
                    cell.classList.add("choice-js");
                    cell.innerHTML = count;
                    cell.onclick = function() {choiceDay(this.innerHTML)};
                    count++;       
                }
                else {
                    cell.setAttribute("class", "not_day-js");
                }
                row.appendChild(cell);  
            }
            table.appendChild(row);
        }
    
        container.appendChild(table);
    
        var month = document.getElementById("month-js");
        var year = document.getElementById("year-js");
        updateMonth(month, today);
        updateYear(year, today);
    
        month.onchange = year.onchange = function() {
            selectCbo(year.options[year.selectedIndex].value, 
                month.options[month.selectedIndex].value, 
                daysInMonth(month.options[month.selectedIndex].value, 
                    year.options[year.selectedIndex].value));
        }
    
        var preMonth = document.getElementById("preMonth-js");
        var preYear = document.getElementById("preYear-js");
        var nextMonth = document.getElementById("nextMonth-js");
        var nextYear = document.getElementById("nextYear-js");
        check = true;
        //set event click previous month
        preMonth.onclick = function() {
            selectCbo(year.options[year.selectedIndex].value, 
                parseInt(month.options[month.selectedIndex].value) - 1, 
                daysInMonth(parseInt(month.options[month.selectedIndex].value) - 1, 
                    year.options[year.selectedIndex].value));
            var newDate = new Date();
            newDate.setFullYear(year.options[year.selectedIndex].value, 
                parseInt(month.options[month.selectedIndex].value) - 1,
             1);
            updateMonth(month, newDate);
            updateYear(year, newDate);
        }
        //set event click previous year
        preYear.onclick = function() {
            selectCbo(parseInt(year.options[year.selectedIndex].value) - 1, 
                month.options[month.selectedIndex].value, 
                daysInMonth(month.options[month.selectedIndex].value, 
                    parseInt(year.options[year.selectedIndex].value) - 1));
            var newDate = new Date();
            newDate.setFullYear(parseInt(year.options[year.selectedIndex].value) - 1, 
            month.options[month.selectedIndex].value,
             1);
            updateYear(year, newDate);
        }
        //set event click next month
        nextMonth.onclick = function() {
            selectCbo(year.options[year.selectedIndex].value, 
                parseInt(month.options[month.selectedIndex].value) + 1, 
                daysInMonth(parseInt(month.options[month.selectedIndex].value) + 1, 
                    year.options[year.selectedIndex].value));
            var newDate = new Date();
            newDate.setFullYear(year.options[year.selectedIndex].value, 
                parseInt(month.options[month.selectedIndex].value) + 1,
             1);
            updateMonth(month, newDate);
            updateYear(year, newDate);
        }
        //set event click next year
        nextYear.onclick = function() {
            selectCbo(parseInt(year.options[year.selectedIndex].value) + 1, 
                month.options[month.selectedIndex].value, 
                daysInMonth(month.options[month.selectedIndex].value, 
                    parseInt(year.options[year.selectedIndex].value) + 1));
            var newDate = new Date();
            newDate.setFullYear(parseInt(year.options[year.selectedIndex].value) + 1, 
            month.options[month.selectedIndex].value,
             1);
            updateYear(year, newDate);
        }

    }
}
//Get day choice in calendar and show in text box
function choiceDay(day) {
    if (day == "")
        return;
    var month = document.getElementById("month-js");
    var year = document.getElementById("year-js");
    var m = month.options[month.selectedIndex].value;
    var y = year.options[year.selectedIndex].value;

    document.getElementById("calendar-js").value = day.padStart(2, '0') + "/" + (parseInt(m) + 1 + "").padStart(2, '0') + "/" + y;

    var container = document.getElementById("container");
    var table = document.getElementById("table");
    container.removeChild(table);
    check = false;
}
//Get days in month
function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}
//Choice in select
function selectCbo(year, month, dayOfMonth) {
    var date = new Date();
    date.setFullYear(year, month, 1);
    var firstDay = date.getDay();
    var i;
    var j;
    var count = 1;
    for (i = 0; i < 6; i++) {
        for (j = 0; j < 7; j++) {
            var cell = document.getElementById("cell" + (i * 7 + j));

            if ((i * 7 + j) < firstDay) {
                cell.setAttribute("class", "not_day-js");                
                cell.innerHTML = "";
                continue;
            }
            if (count <= dayOfMonth) {
                cell.setAttribute("class", "day-js");
                cell.classList.add("choice-js");
                cell.innerHTML = count;
                cell.onclick = function() {choiceDay(this.innerHTML)};
                count++;       
            }
            else {
                cell.innerHTML = "";
                cell.setAttribute("class", "not_day-js");
            }
        }
    }
}
//Update select item in combobox year
function updateYear(year, date) {
    year.getElementsByTagName("option")[date.getFullYear() - 1900].selected = "selected";
}
//Update select item in combobox month
function updateMonth(month, date) {
    month.getElementsByTagName("option")[date.getMonth()].selected = "selected";
}
//Create Date part in calendar
function createRowDate(table) {
    var rowDate = document.createElement("tr");
    var i;
    var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (i = 0; i < 7; i++) {
        var cellDate = document.createElement("th");
        cellDate.setAttribute("class", "date-js");
        cellDate.innerHTML = day[i];
        rowDate.appendChild(cellDate);
    }
    table.appendChild(rowDate);
}
//Create Nav part in calendar
function createNav(table) {
    var rowNav = document.createElement("tr");
    rowNav.setAttribute("class", "nav-js");

    var preYear = document.createElement("th");
    preYear.setAttribute("id", "preYear-js");
    var preMonth = document.createElement("th");
    preMonth.setAttribute("id", "preMonth-js");
    var cboMonth = document.createElement("th");
    cboMonth.setAttribute("colspan", 2);
    var cboYear = document.createElement("th");
    var nextMonth = document.createElement("th");
    nextMonth.setAttribute("id", "nextMonth-js");
    var nextYear = document.createElement("th");
    nextYear.setAttribute("id", "nextYear-js");

    preYear.innerHTML = "<<";
    preMonth.innerHTML = "<";
    nextMonth.innerHTML = ">";
    nextYear.innerHTML = ">>";

    var i;
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var cboM = document.createElement("select");
    cboM.setAttribute("id", "month-js");
    for (i = 0; i < 12; i++) {
        var t = document.createElement("option");
        t.setAttribute("value", i);
        t.innerHTML = month[i];
        cboM.appendChild(t);
    }

    var cboY = document.createElement("select");
    cboY.setAttribute("id", "year-js");
    for (i = 1900; i < 2100; i++) {
        var t = document.createElement("option");
        t.setAttribute("value", i);
        t.innerHTML = i;
        cboY.appendChild(t);
    }

    cboMonth.appendChild(cboM);
    cboYear.appendChild(cboY);

    rowNav.appendChild(preYear);
    rowNav.appendChild(preMonth);
    rowNav.appendChild(cboMonth);
    rowNav.appendChild(cboYear);
    rowNav.appendChild(nextMonth);
    rowNav.appendChild(nextYear);
    table.appendChild(rowNav);
}