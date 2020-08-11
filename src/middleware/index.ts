import {
    handleBodyRequestParsing,
    handleCompression,
    handleCookie,
    handleCors,
    handleHelmet,
    handleHpp,
    handleLogger
} from './common.middleware';

export default [handleBodyRequestParsing, handleCompression, handleCookie, handleCors, handleHelmet, handleHpp, handleLogger];
