<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import Project from "@/components/views/Project.vue";

interface Project {
  projectID: string
  projectName: string
  projectLevel: string
  managerID: string
  startDate: string
  budget: string
}


// 定义一个 ref 来存储项目列表数据
let projectList = ref([]);

// 定义获取项目列表的函数
const getProjectList = async () => {
  try {
    // 发起异步请求获取项目列表数据
    const response = await axios.get('/project/list');
    // 更新项目列表数据，使用 .value 来访问 ref 的值
    projectList.value = response.data.data;
  } catch (error) {
    console.error('获取项目列表数据时出错:', error);
  }
};
const deleteProject= async (id) =>{
  try {
    const response = await axios.post('/project/delete',{
      id
    });
    getProjectList();
  }catch (error){
    console.log('删除项目出错:',error);
  }
}

onMounted(() => {
  getProjectList();
});


const editFormVisible = ref(false)
const addFormVisible = ref(false)
const form = ref(Project);
const formLabelWidth = '140px'
const handleEdit = (index: number, row: Project) => {
  editFormVisible.value = true;
  Object.assign(form.value, row);

}
const handleAdd = () => {
  form.value = {
    projectID: '',
    projectName: '',
    projectLevel: '',
    managerID: '',
    startDate: '',
    budget: ''
  };
  addFormVisible.value = true;
}
const handleDelete = (index: number, row: Project) => {
  alert(row.projectID)
}

const editProject = (form: Project) => {
  alert(form.projectID)
  editFormVisible.value = false;
}
const addProject = () => {
  addFormVisible.value = false;
}
const searchParams = reactive({
  projectID: '',
  projectName: '',
  projectLevel: '',
  managerID: '',
  startDate: '',
  budget: ''
})
const search = (searchParams: Project) => {
  alert(searchParams.projectID)
  alert(searchParams.startDate)
}
</script>

<template>
  <div class="common-layout">
    <el-container>
        <el-header>
          <el-form :inline="true" :model="searchParams" class="demo-form-inline">
            <el-form-item label="项目ID">
              <el-input v-model="searchParams.projectID" placeholder="项目ID" clearable />
            </el-form-item>
            <el-form-item label="项目名称">
              <el-input v-model="searchParams.projectName" placeholder="项目名称" clearable />
            </el-form-item>
            <el-form-item label="项目级别">
              <el-input v-model="searchParams.projectLevel" placeholder="项目级别" clearable />
            </el-form-item>
            <el-form-item label="负责人ID">
              <el-input v-model="searchParams.managerID" placeholder="负责人ID" clearable />
            </el-form-item>
            <el-form-item label="立项日期">
              <el-date-picker
                  v-model="searchParams.startDate"
                  type="date"
                  placeholder="请选择立项日期"
                  clearable
              />
            </el-form-item>
            <el-form-item label="预算(元)">
              <el-input v-model="searchParams.budget" placeholder="预算(元)" clearable />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="search(searchParams)">查询</el-button>
            </el-form-item>
          </el-form>
      </el-header>
      <br>
      <br>
      <el-main>
        <el-table :data="projectList" style="width: 100%">
          <el-table-column prop="projectID" label="项目ID" width="180" />
          <el-table-column prop="projectName" label="项目名称" width="180" />
          <el-table-column prop="projectLevel" label="项目级别" width="180" />
          <el-table-column prop="managerID" label="负责人ID" width="180" />
          <el-table-column prop="startDate" label="立项日期" width="180" />
          <el-table-column prop="budget" label="预算(元)" width="180" />
          <el-table-column align="right">

            <template #header>
              <el-button size="small" type="success" @click="handleAdd">
                Add
              </el-button>
            </template>
            <template #default="scope">
              <el-button size="small"  type="info" @click="handleEdit(scope.$index, scope.row)">
                Edit
              </el-button>
              <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
              >
                Delete
              </el-button>
            </template>
          </el-table-column>
        </el-table>


        <el-dialog v-model="addFormVisible" title="增加项目" width="500">
          <el-form :model="form">
            <el-form-item label="项目ID" :label-width="formLabelWidth">
              <el-input v-model="form.projectID" autocomplete="on" />
            </el-form-item>
            <el-form-item label="项目名称" :label-width="formLabelWidth">
              <el-input v-model="form.projectName" autocomplete="on" />
            </el-form-item>
            <el-form-item label="项目级别" :label-width="formLabelWidth">
              <el-input v-model="form.projectLevel" autocomplete="on" />
            </el-form-item>
            <el-form-item label="负责人ID" :label-width="formLabelWidth">
              <el-input v-model="form.managerID" autocomplete="on" />
            </el-form-item>
            <el-form-item label="立项日期" :label-width="formLabelWidth">
              <el-input v-model="form.startDate" autocomplete="on" />
            </el-form-item>
            <el-form-item label="预算(元)" :label-width="formLabelWidth">
              <el-input v-model="form.budget" autocomplete="on" />
            </el-form-item>
          </el-form>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="handleAdd">取消</el-button>
              <el-button type="primary" @click="addProject()">
                确认
              </el-button>
            </div>
          </template>
        </el-dialog>



        <el-dialog v-model="editFormVisible" title="项目信息修改" width="500">
          <el-form :model="form">
            <el-form-item label="项目ID" :label-width="formLabelWidth">
              <el-input v-model="form.projectID" autocomplete="on" />
            </el-form-item>
            <el-form-item label="项目名称" :label-width="formLabelWidth">
              <el-input v-model="form.projectName" autocomplete="on" />
            </el-form-item>
            <el-form-item label="项目级别" :label-width="formLabelWidth">
              <el-input v-model="form.projectLevel" autocomplete="on" />
            </el-form-item>
            <el-form-item label="负责人ID" :label-width="formLabelWidth">
              <el-input v-model="form.managerID" autocomplete="on" />
            </el-form-item>
            <el-form-item label="立项日期" :label-width="formLabelWidth">
              <el-input v-model="form.startDate" autocomplete="on" />
            </el-form-item>
            <el-form-item label="预算(元)" :label-width="formLabelWidth">
              <el-input v-model="form.budget" autocomplete="on" />
            </el-form-item>
          </el-form>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="editFormVisible = false">Cancel</el-button>
              <el-button type="primary" @click="editProject(form)">
                Confirm
              </el-button>
            </div>
          </template>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>
