document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('empresaForm');
    const listaContainer = document.getElementById('listaEmpresas');
    const alertBox = document.getElementById('alertBox');
    const btnSubmit = document.getElementById('btnSubmit');
    const inputId = document.getElementById('empresaId');
    const STORAGE_KEY = storage.keys.EMPRESAS;

    // Carregar empresas ao iniciar
    loadEmpresas();

    // Event listener para o formulário
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const id = inputId.value;
        const empresa = {
            nome: document.getElementById('nome').value,
            cnpj: document.getElementById('cnpj').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value
        };

        try {
            if (id) {
                updateEmpresa(Number(id), empresa);
                showAlert('Empresa atualizada com sucesso!', 'success');
            } else {
                saveEmpresa(empresa);
                showAlert('Empresa cadastrada com sucesso!', 'success');
            }

            resetForm();
            renderEmpresas();
        } catch (error) {
            showAlert('Erro ao salvar empresa.', 'error');
        }
    });

    function buscarEmpresas() {
        return storage.getAll(STORAGE_KEY);
    }

    function saveEmpresa(empresa) {
        storage.create(STORAGE_KEY, empresa);
    }

    function updateEmpresa(id, empresa) {
        storage.update(STORAGE_KEY, id, empresa);
    }

    function deleteEmpresaStorage(id) {
        storage.remove(STORAGE_KEY, id);
    }

    function loadEmpresas() {
        renderEmpresas();
    }

    function renderList(empresas) {
        if (empresas.length === 0) {
            listaContainer.innerHTML = '<p style="text-align:center; padding: 20px; color: var(--text-muted);">Nenhuma empresa cadastrada.</p>';
            return;
        }

        listaContainer.innerHTML = empresas.map(e => `
            <div class="list-item">
                <div class="item-info">
                    <h3>${e.nome}</h3>
                    <p>CNPJ: ${e.cnpj}</p>
                    <p>${e.email} | ${e.telefone || 'Sem telefone'}</p>
                </div>
                <div class="item-actions">
                    <button class="btn-edit" onclick="editEmpresa(${e.id}, '${e.nome}', '${e.cnpj}', '${e.email}', '${e.telefone}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-delete" onclick="deleteEmpresa(${e.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    function renderEmpresas() {
        const empresas = buscarEmpresas();
        renderList(empresas);
    }

    window.editEmpresa = (id, nome, cnpj, email, telefone) => {
        inputId.value = id;
        document.getElementById('nome').value = nome;
        document.getElementById('cnpj').value = cnpj;
        document.getElementById('email').value = email;
        document.getElementById('telefone').value = telefone;
        
        btnSubmit.innerHTML = '<i class="fas fa-save"></i> Atualizar Empresa';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.deleteEmpresa = (id) => {
        if (confirm('Tem certeza que deseja excluir esta empresa?')) {
            try {
                deleteEmpresaStorage(id);
                showAlert('Empresa excluída com sucesso!', 'success');
                renderEmpresas();
            } catch (error) {
                showAlert('Erro ao excluir empresa.', 'error');
            }
        }
    };

    function resetForm() {
        form.reset();
        inputId.value = '';
        btnSubmit.innerHTML = '<i class="fas fa-plus"></i> Cadastrar Empresa';
    }

    function showAlert(message, type) {
        alertBox.textContent = message;
        alertBox.className = `alert ${type}`;
        alertBox.style.display = 'block';
        
        setTimeout(() => {
            alertBox.style.display = 'none';
        }, 3000);
    }
});
