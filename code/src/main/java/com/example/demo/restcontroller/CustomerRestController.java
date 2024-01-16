package com.example.demo.restcontroller;

import com.example.demo.entity.AccountEntity;
import com.example.demo.entity.CustomerEntity;
import com.example.demo.entity.Employees;
import com.example.demo.model.request.customer.CustomerRequest;
import com.example.demo.model.request.employee.EmployeeRequest;
import com.example.demo.repository.CustomerRepository;
import com.example.demo.service.AccountService;
import com.example.demo.service.CustomerService;
import com.example.demo.service.serviceiplm.CustomerServiceImpl;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

@RestController
@RequestMapping("/customer")

public class CustomerRestController {

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    AccountService accountService;

    private final CustomerServiceImpl customerService;

    @Autowired
    public CustomerRestController(CustomerServiceImpl customerService) {
        this.customerService = customerService;
    }

    @GetMapping("")
    public ResponseEntity<List<CustomerEntity>> getAllCustomer() {
        List<CustomerEntity> customers = customerService.getAllCustomer();
        return ResponseEntity.ok(customers);
    }

    @PostMapping("")
    public ResponseEntity<?> createCustomer(@RequestBody CustomerEntity customerEntity) {
        try {
            CustomerEntity createdCustomer = customerService.createCustomer(customerEntity);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdCustomer);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomerEntity> updateCustomer(@RequestBody CustomerEntity customerEntity, @PathVariable Long id) {
        CustomerEntity customer = customerService.updateCustomer(customerEntity, id);
        if (customer != null) {
            return ResponseEntity.ok(customer);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update-status/{id}")
    public ResponseEntity<CustomerEntity> updateStatusCustomer(@RequestBody CustomerEntity customerEntity, @PathVariable Long id) {
        customerService.updateStatusCustomer(id , customerEntity);
        if (customerEntity != null) {
            return ResponseEntity.ok(customerEntity);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // xuất file excel Employ
    private static CellStyle cellStyleFormatNumber = null;
    @GetMapping("/excel")
    public void fileExcel() {
        try {
            XSSFWorkbook worbook = new XSSFWorkbook();
            XSSFSheet sheet = worbook.createSheet("List of Customer");

            XSSFRow row = null;
            Cell cell = null;

            row = sheet.createRow(0);
            cell = row.createCell(0, CellType.NUMERIC);
            cell.setCellValue("STT");

            cell = row.createCell(1, CellType.STRING);
            cell.setCellValue("Full Name");

            cell = row.createCell(2, CellType.STRING);
            cell.setCellValue("Account");

            cell = row.createCell(3, CellType.STRING);
            cell.setCellValue("Phone Number");

            cell = row.createCell(4, CellType.STRING);
            cell.setCellValue("Email");

            cell = row.createCell(5, CellType.STRING);
            cell.setCellValue("Avatar");

            cell = row.createCell(6, CellType.STRING);
            cell.setCellValue("Created At");

            cell = row.createCell(7, CellType.STRING);
            cell.setCellValue("Updated At");

            cell = row.createCell(8, CellType.STRING);
            cell.setCellValue("Created By");

            cell = row.createCell(9, CellType.STRING);
            cell.setCellValue("Updated By");

            cell = row.createCell(10, CellType.STRING);
            cell.setCellValue("Status");

            List<CustomerEntity> list = customerService.getAllCustomer();

            if (list != null) {
                int s = list.size();
                for (int i = 0; i < s; i++) {
                    CustomerEntity hd = list.get(i);
                    row = sheet.createRow(6 + i);

                    cell = row.createCell(0, CellType.NUMERIC);
                    cell.setCellValue(i + 1);

                    cell = row.createCell(1, CellType.STRING);
                    cell.setCellValue(hd.getFullName());

                    cell = row.createCell(2, CellType.STRING);
                    cell.setCellValue(hd.getAccount().getAccount());

                    cell = row.createCell(3, CellType.STRING);
                    cell.setCellValue(hd.getAccount().getPhoneNumber());

                    cell = row.createCell(4, CellType.STRING);
                    cell.setCellValue(hd.getAccount().getEmail());

                    cell = row.createCell(5, CellType.STRING);
                    cell.setCellValue(hd.getAvatar());

//                    cell = row.createCell(6, CellType.STRING);
//                    cell.setCellValue(new Da);

//                    cell = row.createCell(6, CellType.BOOLEAN);
//                    cell.setCellValue(hd.getGender().toString());

                    cell = row.createCell(6, CellType.STRING);
                    cell.setCellValue(hd.getCreatedAt());

//                    cell = row.createCell(7, CellType.STRING);
//                    cell.setCellValue(hd.getRoles().getFullName().toString());

//                    cell = row.createCell(7, CellType.NUMERIC);
//                    cell.setCellValue(hd.getStatus().intValue());
//                    cell.setCellStyle(cellStyleFormatNumber);

                    cell = row.createCell(7, CellType.STRING);
                    cell.setCellValue(hd.getUpdatedAt());

                    cell = row.createCell(8, CellType.STRING);
                    cell.setCellValue(hd.getCreatedBy());

                    cell = row.createCell(9, CellType.STRING);
                    cell.setCellValue(hd.getUpdatedBy());

                    cell = row.createCell(10, CellType.STRING);
                    cell.setCellValue(hd.getStatus());
                }
                File e = new File("E:\\FileCustomer.xlsx");
                try {
                    FileOutputStream fis = new FileOutputStream(e);

                    worbook.write(fis);
                    fis.close();

                } catch (FileNotFoundException x) {
                    x.printStackTrace();
                }
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }

    }

    @PostMapping("/createaKA")
    public ResponseEntity<?> createCustomerAccount(@RequestBody CustomerRequest customerRequest) {
        AccountEntity accountEntity = accountService.save(customerRequest.getAccountEntity());
        CustomerEntity eAdd = customerRequest.getCustomerEntity();
        eAdd.setAccount(accountEntity);
        CustomerEntity customerEntity = customerService.createCustomer(eAdd);
        return ResponseEntity.ok(customerEntity);
    }
}
