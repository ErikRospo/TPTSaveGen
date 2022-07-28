
import bz2

file1=open("62b6696900.stm")
uncompressed=bz2.decompress(file1.read())
file1.close()
file2=open("62b6696900.bin","wb")
file2.write(uncompressed)
file2.close()