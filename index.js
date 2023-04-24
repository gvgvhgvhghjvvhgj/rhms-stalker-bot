const noble = require('noble');

// target device UUID
const target_uuid = "641-0000-1000-8000-00805f9b34fb";

// start scanning for devices
noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning();
  } else {
    noble.stopScanning();
  }
});

// when a device is found
noble.on('discover', function(peripheral) {
  if (peripheral.uuid === target_uuid) {
    // connect to the target device
    peripheral.connect(function(error) {
      if (error) throw error;

      // discover the services and characteristics
      peripheral.discoverAllServicesAndCharacteristics(function(error, services, characteristics) {
        if (error) throw error;

        // find the characteristic to write to
        const writeCharacteristic = characteristics.find(function(c) {
          return c.properties.includes('write');
        });

        // send the message
        const message = new Buffer.from("hello");
        writeCharacteristic.write(message, true, function(error) {
          if (error) throw error;

          // disconnect from the target device
          peripheral.disconnect(function(error) {
            if (error) throw error;

            console.log("Message sent successfully.");
          });
        });
      });
    });
  }
});
