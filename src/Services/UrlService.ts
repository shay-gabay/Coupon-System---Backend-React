class UrlService{
    private baseUrl = `http://localhost:8080`;
    public auth = this.baseUrl + "/api/auth";
    public admin = this.baseUrl + "/api/admin";
    public company = this.baseUrl + "/api/company";
    public customer = this.baseUrl + "/api/customer";
    public coupon = this.baseUrl + "/api/coupon";
}

const urlService = new UrlService();
export default urlService;