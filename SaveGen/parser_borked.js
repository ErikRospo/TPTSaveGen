//@ts-check
const A = require("arcsecond");
const B = require("arcsecond-binary");
const C = require("construct-js");
const fs = require("fs");
const path = require("path");
const bz2 = require("bz2");
const zlib = require("zlib");
// const BSONlib = require("bson");
const { log } = require("console");
const { join } = require("path");
/**
 *
 * @param {Array} x
 * @returns {number} the number, from the array of bytes
 */
function toint(x) {
  let current = 0;
  for (let i = 0; i < x.length; i++) {
    current += x[i] //* Math.pow(256, i);
  }
  // for (let i = 0; i < x.length; i++) {
    // current = current << 8;
    // current |= x[i];
  // }
  
  return current;
}
/**
 *
 * @param {Array<Number>} x
 * @returns {string} the string, from the array of bytes
 */
function fromint(x) {
  var i,
    str = "";

  for (i = 0; i < x.length; i++) {
    str += "%" + ("0" + x[i].toString(16)).slice(-2);
  }
  return decodeURIComponent(str);
}

const stmFileName = "/62b669e900.stm";
const FileContentsBuffer = fs.readFileSync(join(__dirname, stmFileName));
const FileContents = FileContentsBuffer;
console.log(join(__dirname, stmFileName));
const headerSubChunk = A.coroutine(function* () {
  const id = yield A.sequenceOf([B.u8, B.u8, B.u8]);
  const version = yield B.u8;
  const cellsize = yield B.u8;
  const width = yield B.u8;
  const height = yield B.u8;
  /**
   * @type {Array<number>}
   */
  const bz2array = [];

  for (let i = 0; i < FileContents.byteLength; i++) {
    const dv = yield B.u8;
    bz2array.push(Number(dv));
  }
  console.assert(
    bz2array.length === FileContents.byteLength,
    "bz2array.length !== file.byteLength, expected " +
      FileContentsBuffer.byteLength +
      ", got " +
      bz2array.length
  );
  console.assert(
    toint(bz2array.slice(0, 4)) === bz2array.length,
    "bz2array.slice(0,4)!==bz2array.length, expected " +
      bz2array.length +
      ", got " +
      toint(bz2array.slice(0, 4))
  );
  console.assert(
    fromint(bz2array.slice(0, 4)) === "OPS1",
    "read wrong file, expected OPS1, got " + fromint(bz2array.slice(0, 4))
  );
  console.log(bz2array);

  // fs.writeFileSync(path.join(__dirname, `./${filename}.bson`), bson);

  // bz2array.reverse();
  // bsondata = BSON.deserialize(Buffer.from(bson));
  let bz2data = Buffer.from(bz2array);
  fs.writeFileSync(join(__dirname,`${stmFileName}.bz2`), bz2data);
  let bsondata, bz2raw;
  try {
    let bz2raw = bz2.decompress(bz2data);
    // bsondata=BSONlib.deserialize(bz2raw);
  } catch (error) {
    console.log(error);
  }

  const headerSubChunkData = {
    id: id,
    cellsize: cellsize,
    version: version,
    height: height,
    width: width,
    bson: bz2array,
    bsondata: bz2raw,
  };
  return headerSubChunkData;
});
const output = headerSubChunk.run(FileContents);
if (output.isError) {
  console.error(output.error);
}
fs.writeFileSync(join(__dirname,`${stmFileName}.buf`), FileContentsBuffer);
fs.writeFileSync(
  join(__dirname, `${stmFileName}.json`),
  // @ts-ignore
  JSON.stringify(output.result)
);
//@ts-ignore
console.log(output.result);
