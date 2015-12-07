# Google DRRrrRrvrr (gzapi) - by nishanth selvam
This app provides 2 tabs -  list and document. The 'list' tab lists 10 docs from teh user's drive. Clicking on a file, takes the user
to the document tab. The contents of the file selected is displayed 'zombified' in the documents tab.
    
    
# Build and Access the application
* navigate to the DRRrrRrvrr folder

* run npm install

* run bower install

* update the config.js file, replace the <client id here> text with the client id.

* run gulp

* on a browser window navigate to http://localhost:8080/

* click on authorize button to display the files

* in order to just run tests run karma start


# Some Implementation details
* List page or tab is backed by the ListController

* while the document tab is backed by the DisplayController

* The 'gdata' service provides methods for google api authentication, listing files and fetching a file
 
* The 'config' service is a factory for client info required for oauth authentication.
 
* The 'ztrans' service provides method to zombify the input. Since the input is part of the url and there is a limitation on the url length, 
the input is broken down in to smaller chunks (of length 2000 chars) and then the responses are reassembled.  
    
