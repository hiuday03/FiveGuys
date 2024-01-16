package com.example.demo.restcontroller;

import com.example.demo.entity.AccountEntity;
import com.example.demo.entity.Employees;
import com.example.demo.model.request.employee.EmployeeRequest;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.service.AccountService;
import com.example.demo.service.EmployeeService;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/employee")
public class EmployeeRestController {
    @Autowired
    EmployeeService employeeService;

    @Autowired
    AccountService accountService;

    @Autowired
    EmployeeRepository employeeRepository;


    @GetMapping("")
    public ResponseEntity<List<Employees>> getAll() {
        List<Employees> customers = employeeService.getAll();
        return ResponseEntity.ok(customers);

    }

    //get employee status =1
    @GetMapping("/status1")
    public ResponseEntity<List<Employees>> getAllStatusDangLam() {
        List<Employees> customers = employeeService.getAllStatusDangLam();
        return ResponseEntity.ok(customers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employees> getById(@PathVariable Long id) {
        Employees customers = employeeService.getById(id);
        return ResponseEntity.ok(customers);
    }
    @GetMapping("/search-status/{id}")
    public ResponseEntity<List<Employees>> getAllstatus(@PathVariable Integer id) {
        List<Employees> customers =  employeeService.getAllStatus(id);
        return ResponseEntity.ok(customers);
    }


    @GetMapping("/get-page")
    public ResponseEntity<Page<Employees>> phantrang(@RequestParam(defaultValue = "0", name = "page") Integer t) {
        Page<Employees> customers = employeeService.phanTrang(t, 5);

        return ResponseEntity.ok(customers);
    }
     @PutMapping("/update-status-nhan-vien/{id}")
     public void updateStatus(@PathVariable Long id){
        employeeRepository.updateStatusEmployee(id);
     }


    //Thêm Employee

    @PostMapping("")
    public ResponseEntity<?> create(@RequestBody Employees employees) {
        try {
            Employees createdEmployee = employeeService.create(employees);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdEmployee);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }


    // delete Employee
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        employeeService.delete(id);
        return ResponseEntity.noContent().build();
    }

    //update employee
    @PutMapping("/{id}")
    public ResponseEntity<Employees> update(@PathVariable Long id, @RequestBody Employees employees) {
        employeeService.update(id, employees);
        if (employees != null) {
            return ResponseEntity.ok(employees);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("/status/{id}")
    public ResponseEntity<Employees> updatestatus(@PathVariable Long id, @RequestBody Employees employees) {
        employeeService.updateRole(id, employees);
        if (employees != null) {
            return ResponseEntity.ok(employees);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //delete theo status
    @PutMapping("/delete/{id}")
    public ResponseEntity<Employees> updateStatus(@PathVariable Long id, @RequestBody Employees employees) {
        employeeService.updateRole(id, employees);
        if (employees != null) {
            return ResponseEntity.ok(employees);
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
            XSSFSheet sheet = worbook.createSheet("List of Employee");

            XSSFRow row = null;
            Cell cell = null;
            LocalDateTime date = LocalDateTime.now();
            DateTimeFormatter getDate = DateTimeFormatter.ofPattern("yyyy-MM-dd-HH-mm-ss");
            row = sheet.createRow(0);
            cell = row.createCell(0, CellType.NUMERIC);
            cell.setCellValue("STT");

            cell = row.createCell(1, CellType.STRING);
            cell.setCellValue("Code");

            cell = row.createCell(2, CellType.STRING);
            cell.setCellValue("Full Name");

            cell = row.createCell(3, CellType.STRING);
            cell.setCellValue("Account");

            cell = row.createCell(4, CellType.STRING);
            cell.setCellValue("Phone Number");

            cell = row.createCell(5, CellType.STRING);
            cell.setCellValue("Email");

            cell = row.createCell(6, CellType.STRING);
            cell.setCellValue("Address");

            List<Employees> list = employeeService.getAllStatusDangLam();

            if (list != null) {
                int s = list.size();
                for (int i = 0; i < s; i++) {
                    Employees hd = list.get(i);
                    row = sheet.createRow(1 + i);

                    cell = row.createCell(0, CellType.NUMERIC);
                    cell.setCellValue(i + 1);

                    cell = row.createCell(1, CellType.STRING);
                    cell.setCellValue(hd.getCode());

                    cell = row.createCell(2, CellType.STRING);
                    cell.setCellValue(hd.getFullName());

                    cell = row.createCell(3, CellType.STRING);
                    cell.setCellValue(hd.getAccount().getAccount());
//
                    cell = row.createCell(4, CellType.STRING);
                    cell.setCellValue(hd.getAccount().getPhoneNumber());
//
                    cell = row.createCell(5, CellType.STRING);
                    cell.setCellValue(hd.getAccount().getEmail());

//                    cell = row.createCell(6, CellType.STRING);
//                    cell.setCellValue(new Da);

//                    cell = row.createCell(6, CellType.BOOLEAN);
//                    cell.setCellValue(hd.getGender().toString());

                    cell = row.createCell(6, CellType.STRING);
                    cell.setCellValue(hd.getAddress());

//                    cell = row.createCell(7, CellType.STRING);
//                    cell.setCellValue(hd.getRoles().getFullName().toString());

//                    cell = row.createCell(7, CellType.NUMERIC);
//                    cell.setCellValue(hd.getStatus().intValue());
//                    cell.setCellStyle(cellStyleFormatNumber);

                }
                File e = new File("E:\\"+"FileEmployee"+date.format(getDate)+".xlsx");
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

    @PostMapping("/createEA")
    public ResponseEntity<?> createEmployeeAccount(@RequestBody EmployeeRequest employeeRequest) {
        AccountEntity accountEntity = accountService.save(employeeRequest.getAccountEntity());
        Employees eAdd = employeeRequest.getEmployee();
        eAdd.setAccount(accountEntity);
        Employees employees = employeeService.create(eAdd);
        return ResponseEntity.ok(employees);
    }
}