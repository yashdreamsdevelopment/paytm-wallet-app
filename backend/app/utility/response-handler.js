class ResponseHandler {
  constructor(data, error) {
    this.data = data;
    this.error = error;

    // if (this.data?.statusCode) {
    //   delete this.data.statusCode;
    // }

    // if (this.data?.success) {
    //   delete this.data.success;
    // }
  }
}

module.exports = {
  ResponseHandler,
};
