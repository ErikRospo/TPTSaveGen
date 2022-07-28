import bz2
import bson
filefile=open("62b6732800.stm",'rb')
file=bytearray(filefile.read())
version=file[4]

width=file[6]
height=file[7]
cellsize=file[5]
fullwidth=width*cellsize
fullheight=height*cellsize
bsonlength=file[8:12]
bzbin=file[12:]
bzdata=bz2.decompress(bzbin)
bsonlength=int.from_bytes(bsonlength,byteorder='little')
print("Version:",version)
print("Width:",width)
print("Height:",height)
print("Fullwidth:",fullwidth)
print("Fullheight:",fullheight)
print("Fullsize:",fullwidth*fullheight)
print("Cellsize:",cellsize)
print("Bson length:",bsonlength)
# print("bz2 data:",bzdata)
# print("bson data:",bson.loads(bzdata))
data=bson.loads(bzdata)
pdatapos=data['partsPos']
pdata=data['parts']
print("Parts:",len(pdata))
print("PartsPos:",len(pdatapos))
## the pdatapos is a bitmap of the parts that are present
filefile.close()
outfile=open("62b6732800.stm.bin","wb")
outfile.write(bzdata)