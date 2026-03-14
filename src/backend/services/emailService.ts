/* // src/service/EmailService.ts
import dotenv from 'dotenv';
import { ProductRepository, PurchaseRepository } from '../repository';
import sgMail from '@sendgrid/mail';

dotenv.config();

export class EmailService {

  private senderEmail: string;
  private productRepository: ProductRepository;
  private purchaseRepository: PurchaseRepository;

  constructor(productRepository: ProductRepository, purchaseRepository: PurchaseRepository) {
    this.productRepository = productRepository;
    this.purchaseRepository = purchaseRepository;
    this.senderEmail = process.env.EMAIL_USER || 'no-reply@tudominio.com';
  }

  public async sendPurchaseConfirmation(id: number): Promise<void> {

    sgMail.setApiKey(process.env.EMAIL_PASS || "")
    const purchase = await this.purchaseRepository.findById(id);
    
    if (!purchase || !purchase.visitor) {
      console.warn(`WARN: No se pudo enviar email: El cliente para la compra #${id} no tiene email asociado.`);
      return;
    }
    const clientEmail = purchase.visitor.email; 
    
    if (!clientEmail) {
      console.warn(`WARN: No se pudo enviar email: El cliente para la compra #${purchase.id} no tiene email asociado.`);
      return;
    }

    const productIds = purchase.details.map(detail => detail.productId);
    const products = await this.productRepository.findByIds(productIds);

    const productMap = products.reduce((map, product) => {
      map[product.id] = product.name; 
      return map;
    }, {} as Record<number, string>);

    const detailList = purchase.details.map(detail => {
      const productName = productMap[detail.productId] || `Producto #${detail.productId} (Nombre no encontrado)`;
      return `
        <tr>
          <td style="padding: 8px 15px;">${productName}</td>
          <td style="padding: 8px 15px; text-align: center;">x${detail.quantity}</td>
          <td style="padding: 8px 15px; text-align: right;">$${(detail.quantity * detail.price)}</td>
        </tr>
      `;
    }).join('');

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
        <h1 style="color: #4CAF50;">¡Compra Confirmada! 🎉</h1>
        <p>Estimado cliente,</p>
        <p>Tu orden **#${purchase.id}** ha sido confirmada exitosamente. A continuación, los detalles de tu compra:</p>

        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead style="background-color: #f2f2f2;">
            <tr>
              <th style="padding: 10px 15px; text-align: left;">Producto</th>
              <th style="padding: 10px 15px;">Cantidad</th>
              <th style="padding: 10px 15px; text-align: right;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${detailList}
          </tbody>
          <tfoot style="border-top: 2px solid #ddd;">
            <tr>
              <td colspan="2" style="padding: 10px 15px; text-align: right; font-weight: bold;">TOTAL</td>
              <td style="padding: 10px 15px; text-align: right; font-weight: bold;">$${purchase.total}</td>
            </tr>
          </tfoot>
        </table>

        <p><strong>Referencia de Pago Ualá:</strong> ${purchase.paymentId || 'N/A'}</p>
        <p>Gracias por comprar con nosotros. Tu pedido será procesado pronto.</p>
      </div>
    `;

    const recipients: string[] = [this.senderEmail, clientEmail]

    const msg = {
      to: clientEmail, 
      from: 'Tienda Mammasoul <mammasoul.store@gmail.com>', 
      bcc: 'mammasoul.store@gmail.com',
      subject: `Confirmación de Compra Exitosa (#${purchase.id})`,
      html: htmlContent,
    }

    try {
      await sgMail.send(msg);
      console.log(`Email de confirmación enviado a ${clientEmail}: ${msg}`);
    } catch (error) {
      console.error(`ERROR al enviar correo de confirmación para #${purchase.id}:`, error);
    }
  }
} */