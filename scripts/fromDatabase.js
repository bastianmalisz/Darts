$.getJSON('getinfo.php', function(data) {
    $.each(data, function(fieldName, fieldValue) {
        console.log(fieldName, fieldValue)
    });
});