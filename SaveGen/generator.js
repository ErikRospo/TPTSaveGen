//@ts-check
const fs=require("fs");
const path=require("path");
const compressjs=require("keybase-compressjs");
const BSONlib=require("bson");
const { log,assert }=require("console");
const { join }=require("path");
const bz2=compressjs.Bzip2;
let CELL=4;
let blockX,blockY,blockW,blockH,fullX,fullY,fullW,fullH;
let x,y,i;

let minMajorVersion=90;
let minMinorVersion=2;

blockX=0
blockY=0
