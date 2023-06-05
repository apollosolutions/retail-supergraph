fn execution_service(service) {
    let response_callback = |response| {
        print("Custom script triggered");

        if response.body.errors.len() > 0 {
            print("Error occurred: ");
            print(response.body.errors);
        }
    };
  
    service.map_response(response_callback);
  }