

document.getElementById('prescription-form').onsubmit = function(event) {
    event.preventDefault();
   gerarPDF();
  };
  
function gerarPDF() {
    // Captura os valores do formulário
    var nomePaciente = document.getElementById('patient-name').value;
    var medicamentoSelecionado = document.getElementById('medicine').options[document.getElementById('medicine').selectedIndex].text;

    // Cria uma nova instância do jsPDF
    const { jsPDF } = window.jspdf;
    var doc = new jsPDF();

    // Adiciona texto ao documento PDF
    doc.text('Receita Médica', 10, 10);
    doc.text('Nome do Paciente: ' + nomePaciente, 10, 20);
    doc.text('Medicamento Prescrito: ' + medicamentoSelecionado, 10, 30);

    // Salva o PDF gerado
    doc.save('receita-medica.pdf');
}