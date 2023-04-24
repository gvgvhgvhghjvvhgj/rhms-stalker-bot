import paramiko
import time

# Set up SSH client
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('raspberrypi', username='rhms', password='98052')

# Execute commands to control GPIO pins
print('executing commands')
stdin, stdout, stderr = ssh.exec_command('sudo pigpiod')
stdin, stdout, stderr = ssh.exec_command('pigs m 17 w') # Set pin 17 as an output
stdin, stdout, stderr = ssh.exec_command('pigs w 17 1') # Turn on LED connected to pin 17
time.sleep(5)
stdin, stdout, stderr = ssh.exec_command('pigs w 17 0') # Turn off LED connected to pin 17

# Close SSH connection
ssh.close()