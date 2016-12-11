$.getJSON('/articles', function(data) 
{
  for (var i = 0; i<data.length; i++)
  {
    $('#articles').prepend('<hr><br><div class="panel panel-default"><div class="panel-heading"><p data-id="' + data[i]._id + '">'+ data[i].title + '<br /></div><div class="panel-body"><a href="' + data[i].link + '">'+ data[i].link + '</a></div></div></p><br><hr>');
  }
});

$(document).on('click', 'p', function()
{
  $('#notes').empty();
  var thisId = $(this).attr('data-id');
  $.ajax(
  {
    method: "GET",
    url: "/articles/" + thisId,
  })

    .done(function( data ) 
    {
      $('#deleteNotes').empty();
      $('#notes').append('<h2>Add some notes: <h2><br><div class="jumbotron"><h4 id="dataTitle">' + data.title + '</h4></div>');
      $('#notes').append('<h4>Title of note: </h4><input id="titleinput" class="form-control" name="title" >');
      $('#notes').append('<h4>Body of note: </h4><textarea id="bodyinput" class="form-control" name="body"></textarea>');
      $('#notes').append('<br><button type="button"  class="btn btn-success" data-id="' + data._id + '" id="savenote">Save Note</button>');
      if(data.note)
      {
        $('#titleinput').val(data.note.title);
        $('#bodyinput').val(data.note.body);
        $('#deleteNotes').append('<table id="dataTable" class="table"><thead><h2>Existing Notes: </h2></tead><tbody id="dataBody"></tbody></table><button id="deleteButton" class="btn btn-danger" data-id="' + data.note._id + '">Delete</button>')
        $('#dataBody').append('<tr class="warning"><td><strong>' + data.note.title + '</strong></td></tr><tr class="success"><td>' + data.note.body + '</td></tr>');
      } 
      else 
      {
        $('#deleteNotes').append('<div class="jumbotron"><h2>No notes exist for this article, get to writing!</h2></div>')
      }
    });
});

$(document).on('click', '#deleteButton', function()
{
  var thisId = $(this).attr('data-id');
  console.log(thisId);
  $.ajax(
  {
    method: "POST",
    url: "/removenote/" + thisId
  })
    .done(function() 
    {
        $('#titleinput').val("");
        $('#bodyinput').val("");
        $('#deleteNotes').empty();
        $('#deleteNotes').append('<div class="jumbotron"><h2>Click on an article to see if notes already exist!</h2></div>');
    });
});


$(document).on('click', '#savenote', function()
{
  var thisId = $(this).attr('data-id');
  $.ajax(
  {
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $('#titleinput').val(),
      body: $('#bodyinput').val()
    }
  })
    .done(function( data ) 
    {
      console.log(data);
      $('#notes').empty();
      $('#notes').append('<div class="jumbotron"><h2>Click on an article if you wish to add notes!</h2></div>');
    });
  $('#titleinput').val("");
  $('#bodyinput').val("");
});