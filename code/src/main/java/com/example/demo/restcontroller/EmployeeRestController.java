package com.example.demo.restcontroller;

import com.example.demo.entity.Employees;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.service.EmployeeService;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/employee")
public class EmployeeRestController {
    @Autowired
    EmployeeService employeeService;

    @Autowired
    EmployeeRepository employeeRepository;


    //get employee
    @GetMapping("")
    public ResponseEntity<List<Employees>> getAll() {
        List<Employees> customers = employeeService.getAll();
        return ResponseEntity.ok(customers);
    }

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2604c71244a188cb01c2f8826de82e86568fe39c
    //get employee status =1
    @GetMapping("/status1")
    public ResponseEntity<List<Employees>> getAllStatusDangLam() {
        List<Employees> customers = employeeService.getAllStatusDangLam();
        return ResponseEntity.ok(customers);
    }

    //search ma
    @GetMapping("/search/{code}")
    public ResponseEntity<Page<Employees>> getByMa(@PathVariable String code, @RequestParam(defaultValue = "0", name = "page") Integer size) {
        Pageable pageable = PageRequest.of(size, 5);
        Page<Employees> customers = employeeRepository.searchMa(code, pageable);
        return ResponseEntity.ok(customers);
    }
<<<<<<< HEAD

=======
    //search ma
//    @GetMapping("/search/{code}")
//    public ResponseEntity<List<Employees>> getByMa(@PathVariable String code) {
//        List<Employees> customers = employeeService.searchMa(code);
//        return ResponseEntity.ok(customers);
//    }
>>>>>>> develop
=======
>>>>>>> 2604c71244a188cb01c2f8826de82e86568fe39c
    @GetMapping("/{id}")
    public ResponseEntity<Employees> getById(@PathVariable Long id) {
        Employees customers = employeeService.getById(id);
        return ResponseEntity.ok(customers);
    }


    @GetMapping("/get-page")
    public ResponseEntity<Page<Employees>> phantrang(@RequestParam(defaultValue = "0", name = "page") Integer t) {
        Page<Employees> customers = employeeService.phanTrang(t, 5);

        return ResponseEntity.ok(customers);
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


//    @PostMapping("upload/save")
//    public String send(@RequestParam("attch")MultipartFile attch) throws IllegalStateException, IOException {
//        if(!attch.isEmpty()){
//            String fileName = attch.getOriginalFilename();
//            File file = new File(employeeService.get)
//        }
//    }

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

            row = sheet.createRow(6);
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

//            cell = row.createCell(6, CellType.STRING);
//            cell.setCellValue("BirthDate");

//            cell = row.createCell(6, CellType.BOOLEAN);
//            cell.setCellValue("Gender");

            cell = row.createCell(6, CellType.STRING);
            cell.setCellValue("Address");

//            cell = row.createCell(8, CellType.STRING);
//            cell.setCellValue("Role");
//
//            cell = row.createCell(9, CellType.NUMERIC);
//            cell.setCellValue("Status");

            List<Employees> list = employeeService.getAll();

            if (list != null) {
                int s = list.size();
                for (int i = 0; i < s; i++) {
                    Employees hd = list.get(i);
                    row = sheet.createRow(6 + i);

                    cell = row.createCell(0, CellType.NUMERIC);
                    cell.setCellValue(i + 1);

                    cell = row.createCell(1, CellType.STRING);
                    cell.setCellValue(hd.getCode());

                    cell = row.createCell(2, CellType.STRING);
                    cell.setCellValue(hd.getFullName());

//                    cell = row.createCell(3, CellType.STRING);
//                    cell.setCellValue(hd.getAccount());
//
//                    cell = row.createCell(4, CellType.STRING);
//                    cell.setCellValue(hd.getPhoneNumber());
//
//                    cell = row.createCell(5, CellType.STRING);
//                    cell.setCellValue(hd.getEmail());

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
                File f = new File("F:\\FileEmployee.xlsx");
                try {
                    FileOutputStream fis = new FileOutputStream(f);

                    worbook.write(fis);
                    fis.close();

                } catch (FileNotFoundException e) {
                    e.printStackTrace();
                }
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }

    }
}