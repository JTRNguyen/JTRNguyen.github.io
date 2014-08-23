function getCalendarInfo()
	        {
	        	var fileName = "data.txt";
		        var data = "";

		        req = new XMLHttpRequest();
		        req.open("GET", fileName, false);

		        req.addEventListener("readystatechange", function () 
		        {
		        	data = req.responseText ;
		        });

		        req.send();

	            if( data == "" )
	            {
	            	console.log("fail");
	              return 'DataNotReady' ;
	            }
	            else
	            {
   					var patt1 = /[^\n,]+/gi
   					var result = data.match(patt1);
    				var patt2 = /[^@]+/gi;
    				for(i=0; i<result.length; i++)
    				{
    					result[i] = result[i].match(patt2);
    				}
             		console.log(result);
	              	return result;
	        	}
	        }

	        function loadCal()
	        {
	            var ret = getCalendarInfo();
	            var calendarDiv = document.getElementById("calendar");
	            var calTable = document.createElement('TABLE');
	            var calTableBody = document.createElement('TBODY');

	            calTable.appendChild(calTableBody);

	            var tr = document.createElement('TR');
	            calTableBody.appendChild(tr);
	            var th = document.createElement('TH');
	            th.className = "empty";
	            tr.appendChild(th);
	            for(i=1; i<8; i++)
	            {
	            	var th = document.createElement('TH');
	            	th.appendChild(document.createTextNode(ret[i]));
	            	tr.appendChild(th);
	            }
	            for(i=1; i<14; i++)
	            {
	            	var tr = document.createElement('TR');
	            	tr.className = "inside";
	            	for(j=0; j<8; j++)
	            	{
	            		var td = document.createElement('TD');
	            		var text = "";
	            		var limit = ret[(i*8)+j].length;
	            		for(k=0; k<limit; k++)
	            		{
	            			text += ret[(i*8)+j][k] + "<br>";
	            		}
	            		if( ((i*8)+j) % 8 != 0 ) td.className = td.className = " notTime";
	            		else td.className = td.className = " time";
	            		if(text.substring(0,4) == "Free") td.className = td.className + " free";
	            		td.innerHTML = text;
	            		tr.appendChild(td);
	            	}
	            	calTableBody.appendChild(tr);
	            }

	            calendarDiv.appendChild(calTable);
	        }