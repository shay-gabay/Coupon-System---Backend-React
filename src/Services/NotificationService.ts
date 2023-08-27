import { AxiosError } from "axios";
import { toast } from "react-toastify";
class NotificationService {

  public success(msg: string) {
    toast.success(msg);
  }

  public error(msg: any) {
    toast.error(msg);
  }
    public showErrorNotification(err: AxiosError): void {
        const responseError = err?.response?.data;
        const errorMessage = responseError
            ? `${responseError.title}: ${responseError.description}`
            : err.message || 'Something went wrong!';
        this.error(errorMessage);
    }
  }
const notifyService = new NotificationService();
export default notifyService;
