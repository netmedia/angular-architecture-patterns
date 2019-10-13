import { methodBuilder, paramBuilder } from '../../services/utils.service';

/* *********************************************
 * Method decorators
 * *********************************************/

/**
 * GET method
 * @param {string} url - resource url of the method
 */
export var GET = methodBuilder('Get');
/**
 * POST method
 * @param {string} url - resource url of the method
 */
export var POST = methodBuilder('Post');
/**
 * PUT method
 * @param {string} url - resource url of the method
 */
export var PUT = methodBuilder('Put');
/**
 * DELETE method
 * @param {string} url - resource url of the method
 */
export var DELETE = methodBuilder('Delete');
/**
 * HEAD method
 * @param {string} url - resource url of the method
 */
export var HEAD = methodBuilder('Head');

/* *********************************************
 * Parameter decorators
 * *********************************************/

/**
 * Path variable of a method's url, type: string
 * @param {string} key - path key to bind value
 */
export var Path = paramBuilder("Path");
/**
 * Query value of a method's url, type: string
 * @param {string} key - query key to bind value
 */
export var Query = paramBuilder("Query");
/**
 * Body of a REST method, type: key-value pair object
 * Only one body per method!
 */
export var Body = paramBuilder("Body")("Body");
/**
 * Custom header of a REST method, type: string
 * @param {string} key - header key to bind value
 */
export var Header = paramBuilder("Header");
