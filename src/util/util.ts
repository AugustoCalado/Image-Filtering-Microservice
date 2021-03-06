// require('dotenv').config();

import fs from 'fs';
import Jimp = require('jimp');
import * as jwt from 'jsonwebtoken';
import { config } from '../config/config';

// Set the access to the config file
const cfg = config;

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string> {
    return new Promise(async resolve => {
        const photo = await Jimp.read(inputURL);
        const outpath = '/tmp/filtered.' + Math.floor(Math.random() * 2000) + '.jpg';
        await photo
            .resize(256, 256) // resize
            .quality(60) // set JPEG quality
            .greyscale() // set greyscale
            .write(__dirname + outpath, (img) => {
                resolve(__dirname + outpath);
            });
    });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files: Array<string>) {
    for (let file of files) {
        fs.unlinkSync(file);
    }
}

export async function generateJWT(payload: string | object | Buffer): Promise<string> {
    // Use jwt to create a new JWT Payload containing
    
    const secret: string = `${config.jwt.secret || config.jwt['secret-dev']}`;
    
    const token : string = jwt.sign(payload, secret);   

    return token;
}