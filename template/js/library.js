document.addEventListener('DOMContentLoaded', function () {
  // File input
  var fileInput = document.getElementById('fileToUpload');
  // Upload button
  var uploadButton = document.getElementById('uploadButton');

  // Handle file input change
  fileInput.addEventListener('change', handleFileSelect, false);

  // Handle upload button click
  uploadButton.addEventListener('click', uploadFile, false);

  function handleFileSelect() {
      var files = fileInput.files;
      if (files.length > 0) {
          previewFile(files[0]);
      }
  }


  function uploadFile() {
    var file = fileInput.files[0];
    var title = document.getElementById('title').value;
    var author = document.getElementById('author').value;

    if (!file || !title || !author) {
        return alert('Please select a file to upload. or enter a title or author');
    }

    // Create FormData object and append file and additional form data
    var formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('author', author);

    fetch('http://localhost:3002/library/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            console.log('File uploaded successfully');
            alert('File uploaded successfully');
            fileInput.value = '';
            document.getElementById('title').value = ''; // Clear title input
            document.getElementById('author').value = ''; // Clear author input
        } else {
            console.error('Error uploading file');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

});
