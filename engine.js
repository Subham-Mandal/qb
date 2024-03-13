 function fetchData() {
        var loadingDiv = document.getElementById('loading');
        loadingDiv.style.display = 'flex';

        fetch('https://onerealtimeserver-default-rtdb.firebaseio.com/NCERT/bio.json')
            .then(response => response.json())
            .then(jsonData => {
                loadingDiv.style.transition = 'opacity 2s';
                loadingDiv.style.opacity = '0';

                setTimeout(function() {
                    loadingDiv.style.display = 'none';
                }, 1000); 
                
                document.getElementById('cong').style.display = 'block';
        
                window.jsonData = jsonData; 
            })
            .catch(error => {
                loadingDiv.innerHTML = 'Error loading data';
            });
    }

    function searchJson() {
        var searchText = document.getElementById('searchTextncert').value.toLowerCase();
        var resultDiv = document.getElementById('result');
    
        resultDiv.innerHTML = '';
        findKey(window.jsonData, searchText, resultDiv);
    }

    function findKey(obj, searchText, resultDiv, currentPath = '') {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var value = obj[key];

                var newPath = currentPath + (currentPath ? '.' : '') + key;

                if (typeof value === 'object') {
                    findKey(value, searchText, resultDiv, newPath);
                } else if (typeof value === 'string') {
                    var cleanedValue = value.replace(/\n/g, ' ');

                    var lines = cleanedValue.split('.');
                    
                    lines.forEach((line, index) => {
                        if (line.toLowerCase().includes(searchText)) {
                            resultDiv.innerHTML += getResultItem(newPath, lines, index);
                        }
                    });
                }
            }
        }
    }

    function getResultItem(path, lines, index) {
        var result = '<div class="result-item" onclick="gotoncert(\'' + path + '\')"><strong>' + path.replace(/lebo/g, 'XII ').replace(/kebo/g, 'XI ').replace(/10/g, ' / chapter ').replace(/\./g, ' / page ').replace(/:/g, '') + '</strong>:<br>';
        
        for (var i = index - 2; i <= index + 2; i++) {
            if (lines[i]) {
                if (i === index)
                    result += '<span style="opacity: 1;font-size:15px;">' + lines[i].trim() + '</span><br>';
                else
                    result += '<span style="opacity: 0.3;font-size:13px;">' + lines[i].trim() + '</span><br>';
            }
        }
        
        result += '</div>';
        
        return result;
    }

    function gotoncert(path) {
        var url = ('https://ncert.nic.in/textbook/pdf/' + path.replace('.','.pdf#page='));
        window.open(url, '_blank');
    }
